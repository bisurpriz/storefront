"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/(account)/account/favorites/actions";
import { CartStepPaths } from "@/app/(cart)/cart/constants";
import { IPlace } from "@/common/types/Product/product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { parseJson } from "@/utils/format";
import clsx from "clsx";
import { Heart, MapPin, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useProgress } from "react-transition-progress";
import { validateLocation } from "../utils/validateLocation";
import DeliveryLocationsAlert from "./DeliveryLocationsAlert";

interface OwnPlace {
  addressComponents: {
    [key: string]: string;
  };
  label: string;
  placeId: string;
}

interface Props {
  productId: number;
  isFavorite: boolean;
  favoriteCount?: number;
  places: OwnPlace[];
  selectedLocation: IPlace;
  delivery_type: "CARGO_SHIPPING" | "SAME_DAY" | "SAME_DAY_CARGO";
  delivery_time_ranges: string;
}

interface ValidationState {
  isValid: boolean;
  message?: string;
}

const ProductActions = ({
  productId,
  isFavorite: initialIsFavorite,
  places,
  selectedLocation,
  delivery_type,
  delivery_time_ranges,
}: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(initialIsFavorite);
  const [showPlaceWarning, setShowPlaceWarning] = useState(false);
  const [availableLevel4, setAvailableLevel4] = useState<
    Array<{ placeId: string; name: string }>
  >([]);
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
  });

  const { user } = useUser();
  const { addToCart, loading, deliveryTime } = useCart();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const startProgress = useProgress();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const isSameDay = delivery_type === "SAME_DAY";
  const hasDeliveryTimes = Boolean(parseJson(delivery_time_ranges)?.length > 0);

  const isButtonDisableForLocation = useCallback(() => {
    // Müşterinin seçtiği adres ürünün gidebileceği adresler arasında yoksa buton disable olmalıdır.
    // Müşterinin adres seçmemiş ve ürün aynı gün teslimat ise buton disable olmalıdır.

    console.log("[LOCATION_CHECK] Starting location check", {
      isSameDay,
      hasSelectedLocation: !!selectedLocation,
      placesCount: places?.length || 0,
    });

    // Adres seçilmemişse ve ürün aynı gün teslimat ise buton disable olmalıdır
    if (isSameDay && !selectedLocation) {
      console.log(
        "[LOCATION_CHECK] Disabled: Same day delivery but no location selected",
      );
      return true;
    }

    // Eğer hiç place yoksa, butonu disable et
    if (!places || places.length === 0) {
      console.log("[LOCATION_CHECK] Disabled: No delivery places available");
      return true;
    }

    // Eğer seçili konum yoksa daha fazla kontrol yapmaya gerek yok (same day değilse)
    if (!selectedLocation) {
      console.log(
        "[LOCATION_CHECK] Enabled: Not same day delivery, no location needed",
      );
      return false;
    }

    const getComponent = (type: string) =>
      selectedLocation?.address_components?.find((x) =>
        x?.types?.includes(type),
      )?.short_name;

    const selectedLevel4 = getComponent("administrative_area_level_4");
    const selectedLevel2 = getComponent("administrative_area_level_2");
    const selectedLevel1 = getComponent("administrative_area_level_1");

    console.log("[LOCATION_CHECK] Location components", {
      selectedLevel4,
      selectedLevel2,
      selectedLevel1,
    });

    // Seçili lokasyon, gönderim yerleri arasında yoksa, butonu disable et
    const isLocationAvailable = places?.some((place) => {
      // Hierarchical location validation
      if (selectedLevel4 && selectedLevel2 && selectedLevel1) {
        // If we have neighborhood, ensure district and city also match
        return (
          place?.addressComponents["administrative_area_level_4"] ===
            selectedLevel4 &&
          place?.addressComponents["administrative_area_level_2"] ===
            selectedLevel2 &&
          place?.addressComponents["administrative_area_level_1"] ===
            selectedLevel1
        );
      }

      if (selectedLevel2 && selectedLevel1) {
        // If we have district but no neighborhood, ensure city matches
        return (
          place?.addressComponents["administrative_area_level_2"] ===
            selectedLevel2 &&
          place?.addressComponents["administrative_area_level_1"] ===
            selectedLevel1
        );
      }

      if (selectedLevel1) {
        // If we only have city
        return (
          place?.addressComponents["administrative_area_level_1"] ===
          selectedLevel1
        );
      }

      // No location information available
      return false;
    });

    console.log("[LOCATION_CHECK] Location availability check result", {
      isLocationAvailable,
      places: places
        ?.map((p) => ({
          level4: p.addressComponents["administrative_area_level_4"],
          level2: p.addressComponents["administrative_area_level_2"],
          level1: p.addressComponents["administrative_area_level_1"],
        }))
        .slice(0, 3), // Log first 3 places to avoid console clutter
    });

    return !isLocationAvailable;
  }, [selectedLocation, places, isSameDay]);

  const isButtonDisableForTime = useCallback(() => {
    // Müşteri adres seçmişse ve tarih seçmemişse buton disable olmalıdır.

    console.log("[TIME_CHECK] Starting time check", {
      isSameDay,
      hasDeliveryTimes,
      selectedDay: deliveryTime.day ? deliveryTime.day.toISOString() : null,
      selectedHour: deliveryTime.hour,
    });

    // Eğer aynı gün teslimat değilse, zaman kontrolü yapma
    if (!isSameDay) {
      console.log(
        "[TIME_CHECK] Enabled: Not same day delivery, no time needed",
      );
      return false;
    }

    // Teslimat saatleri varsa ve müşteri tarih veya saat seçmemişse disable et
    if (hasDeliveryTimes && (!deliveryTime.day || !deliveryTime.hour)) {
      console.log(
        "[TIME_CHECK] Disabled: Same day delivery with times but missing selection",
      );
      return true;
    }

    console.log("[TIME_CHECK] Enabled: All time conditions met");
    return false;
  }, [isSameDay, hasDeliveryTimes, deliveryTime]);

  const validateDeliveryRequirements = useCallback((): ValidationState => {
    console.log("[VALIDATION] Starting delivery validation", {
      isSameDay,
      hasDeliveryTimes,
      hasLocation: !!selectedLocation,
      placesCount: places?.length || 0,
      deliveryDay: deliveryTime.day ? deliveryTime.day.toISOString() : null,
      deliveryHour: deliveryTime.hour,
    });

    // Eğer adres seçilmemiş ve ürün aynı gün teslimat ise geçersiz
    if (isSameDay && !selectedLocation) {
      console.log(
        "[VALIDATION] Invalid: Same day delivery but no location selected",
      );
      return {
        isValid: false,
        message: "Lütfen teslimat konumunu seçiniz.",
      };
    }

    // Eğer teslimat saatleri varsa ve müşteri tarih/saat seçmemişse geçersiz
    if (
      isSameDay &&
      hasDeliveryTimes &&
      (!deliveryTime.day || !deliveryTime.hour)
    ) {
      console.log(
        "[VALIDATION] Invalid: Same day delivery with times but missing time selection",
      );
      return {
        isValid: false,
        message: "Lütfen teslimat tarihi ve saati seçiniz.",
      };
    }

    // Eğer hiç teslimat yeri yoksa geçersiz
    if (places.length === 0) {
      console.log("[VALIDATION] Invalid: No delivery places available");
      return {
        isValid: false,
        message: "Bu ürün için teslimat bölgesi bulunmamaktadır.",
      };
    }

    // Eğer seçilen yer geçerli değilse geçersiz
    if (selectedLocation && isButtonDisableForLocation()) {
      console.log("[VALIDATION] Invalid: Location not in delivery areas");
      return {
        isValid: false,
        message: "Bu ürün seçili bölgeye gönderilememektedir.",
      };
    }

    console.log("[VALIDATION] Valid: All conditions met");
    return { isValid: true };
  }, [
    isSameDay,
    hasDeliveryTimes,
    deliveryTime,
    selectedLocation,
    places,
    isButtonDisableForLocation,
  ]);

  const handleFavorite = useCallback(async () => {
    if (!user) {
      push("/login");
      return;
    }

    try {
      startTransition(() => {
        startProgress();
        const action = isFavoriteState ? removeFromFavorites : addToFavorites;
        action({ productId });
        setIsFavoriteState(!isFavoriteState);
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description:
          "İşlem sırasında bir hata oluştu. Lütfen tekrar deneyiniz.",
      });
      setIsFavoriteState(isFavoriteState);
    }
  }, [isFavoriteState, user, productId, push, startProgress, toast]);

  const getCartPayload = useCallback(() => {
    const basePayload = {
      id: productId,
      type: "add" as const,
      quantity: 1,
      deliveryLocation: selectedLocation,
    };

    if (!isSameDay || !hasDeliveryTimes) {
      return basePayload;
    }

    return {
      ...basePayload,
      deliveryDate: deliveryTime.day?.toISOString(),
      deliveryTime: deliveryTime.hour,
    };
  }, [productId, selectedLocation, isSameDay, hasDeliveryTimes, deliveryTime]);

  const handleAddToBasket = useCallback(() => {
    console.log("[ADD_TO_BASKET] Button clicked");
    const validation = validateDeliveryRequirements();
    console.log("[ADD_TO_BASKET] Validation result", validation);

    if (!validation.isValid) {
      setValidationState(validation);
      timeoutRef.current = setTimeout(
        () => setValidationState({ isValid: true }),
        3000,
      );
      return;
    }

    startTransition(() => {
      startProgress();
      const payload = getCartPayload();
      console.log("[ADD_TO_BASKET] Adding to cart with payload", payload);
      addToCart(payload);
      push(CartStepPaths.CART);
    });
  }, [validateDeliveryRequirements, addToCart, getCartPayload, startProgress]);

  useEffect(() => {
    if (isSameDay) {
      console.log("[EFFECT] Setting available level4 places", {
        placesCount: places?.length || 0,
      });
      const level4Places = places?.map((place) => ({
        placeId: place.placeId,
        name: place.label,
      }));
      setAvailableLevel4(level4Places || []);
    }
  }, [isSameDay, places]);

  useEffect(() => {
    if (isSameDay) {
      console.log("[EFFECT] Running location validation", {
        hasLocation: !!selectedLocation,
        placesCount: places?.length || 0,
      });
      startTransition(() => {
        validateLocation(
          selectedLocation,
          places,
          isSameDay,
          setShowPlaceWarning,
        );
      });
    }
  }, [selectedLocation, places, isSameDay]);

  useEffect(() => {
    console.log("[COMPONENT] ProductActions mounted");
    return () => {
      console.log("[COMPONENT] ProductActions unmounted");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isAddToCartDisabled =
    isButtonDisableForLocation() || isButtonDisableForTime();
  console.log("[BUTTON_STATE] Final button state", {
    isAddToCartDisabled,
    locationDisabled: isButtonDisableForLocation(),
    timeDisabled: isButtonDisableForTime(),
  });

  const isAddToCartLoading = isPending || loading;
  const locationValidationInProgress = isPending && isSameDay;

  const shouldShowDeliveryLocations =
    !selectedLocation?.address_components.find((x) =>
      x?.types?.some((y) => y === "administrative_area_level_4"),
    ) || isButtonDisableForLocation();

  return (
    <>
      {shouldShowDeliveryLocations && availableLevel4?.length > 0 && (
        <DeliveryLocationsAlert locations={availableLevel4} />
      )}
      {availableLevel4?.length === 0 && showPlaceWarning && (
        <Alert variant="destructive" className="mt-2">
          <Truck
            className={locationValidationInProgress ? "animate-spin" : ""}
          />
          <AlertTitle>Dikkat!</AlertTitle>
          <AlertDescription>
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
            {locationValidationInProgress && " (Kontrol ediliyor...)"}
          </AlertDescription>
        </Alert>
      )}

      {isButtonDisableForLocation() && selectedLocation && (
        <Alert variant="warning" className="mt-2 bg-amber-50/50">
          <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="pl-12">
            <AlertTitle className="mb-2 text-amber-800">
              Satıcı bu ürünü seçtiğiniz bölgeye gönderememektedir
            </AlertTitle>
            <AlertDescription className="text-amber-700">
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-auto gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-amber-700 shadow-sm ring-1 ring-amber-100 hover:bg-amber-50 hover:text-amber-800"
                onClick={() => push("/arama")}
              >
                Size uygun ürünleri görmek için tıklayınız
              </Button>
            </AlertDescription>
          </div>
        </Alert>
      )}

      {isButtonDisableForLocation() && !selectedLocation && isSameDay && (
        <Alert variant="informative" className="mt-2">
          <MapPin />
          <AlertTitle>Lütfen teslimat adresinizi seçin</AlertTitle>
          <AlertDescription>
            Ürünün teslimat için adres seçimi yapmanız gerekmektedir.
          </AlertDescription>
        </Alert>
      )}

      {isButtonDisableForTime() && selectedLocation && (
        <Alert variant="informative" className="mt-2">
          <Truck />
          <AlertTitle>Lütfen teslimat tarihi ve saati seçin</AlertTitle>
          <AlertDescription>
            Sepete eklemeden önce teslimat tarihi ve saati seçmelisiniz.
          </AlertDescription>
        </Alert>
      )}

      {isSameDay && places?.length === 0 && (
        <Alert variant="destructive" className="mt-2">
          <Truck />
          <AlertTitle>Dikkat!</AlertTitle>
          <AlertDescription>
            Bu ürün için aynı gün teslimat bölgesi bulunmamaktadır.
          </AlertDescription>
        </Alert>
      )}

      <div className="my-2 flex space-x-2">
        <Button
          size="lg"
          variant={!validationState.isValid ? "destructive" : "default"}
          className={clsx("flex basis-4/5 items-center justify-center px-0")}
          disabled={isAddToCartDisabled}
          onClick={handleAddToBasket}
          loading={isAddToCartLoading}
        >
          {isSameDay && places?.length === 0
            ? "Bu ürün için gönderim yeri mevcut değil"
            : isButtonDisableForLocation() && selectedLocation
              ? "Seçili bölgeye gönderim yapılamamaktadır"
              : isButtonDisableForLocation() && !selectedLocation && isSameDay
                ? "Lütfen teslimat konumunu seçin"
                : isButtonDisableForTime() && selectedLocation
                  ? "Lütfen teslimat tarihi ve saati seçin"
                  : "Sepete Ekle"}
        </Button>

        <Button
          size="lg"
          className="flex basis-1/5 items-center justify-center px-0"
          variant={isFavoriteState ? "destructive" : "outline"}
          icon={
            isFavoriteState ? (
              <Heart className="h-8 w-8 fill-red-500 text-white" />
            ) : (
              <Heart className="h-8 w-8 text-red-500" />
            )
          }
          onClick={handleFavorite}
          loading={isPending}
        />
      </div>
      {!validationState.isValid && (
        <p
          className={clsx(
            "mt-2 text-sm font-semibold text-red-600",
            "animate-bounce",
          )}
        >
          {validationState.message}
        </p>
      )}
    </>
  );
};

export default memo(ProductActions);
