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

  const validateDeliveryRequirements = useCallback((): ValidationState => {
    if (hasDeliveryTimes && (!deliveryTime.day || !deliveryTime.hour)) {
      return {
        isValid: false,
        message: "Bu ürün için satıcı henüz teslimat saatini belirlemedi.",
      };
    }

    if (isSameDay && (!selectedLocation || places.length === 0)) {
      return {
        isValid: false,
        message: "Lütfen teslimat konumunu seçiniz.",
      };
    }

    return { isValid: true };
  }, [hasDeliveryTimes, deliveryTime, isSameDay, selectedLocation, places]);

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
    const validation = validateDeliveryRequirements();

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
      addToCart(getCartPayload());
      push(CartStepPaths.CART);
    });
  }, [validateDeliveryRequirements, addToCart, getCartPayload, startProgress]);

  const isButtonDisableForLocation = useCallback(() => {
    if (!isSameDay) return false;

    const getComponent = (type: string) =>
      selectedLocation?.address_components?.find((x) =>
        x?.types?.includes(type),
      )?.short_name;

    const selectedLevel4 = getComponent("administrative_area_level_4");
    const selectedLevel2 = getComponent("administrative_area_level_2");
    const selectedLevel1 = getComponent("administrative_area_level_1");

    return !places?.some((place) => {
      if (selectedLevel4) {
        return (
          place?.addressComponents["administrative_area_level_4"] ===
          selectedLevel4
        );
      }
      if (selectedLevel2) {
        return (
          place?.addressComponents["administrative_area_level_2"] ===
          selectedLevel2
        );
      }

      return (
        place?.addressComponents["administrative_area_level_1"] ===
        selectedLevel1
      );
    });
  }, [isSameDay, selectedLocation, places]);

  const isButtonDisableForTime = useCallback(() => {
    if (!isSameDay) return false;
    return hasDeliveryTimes && (!deliveryTime.day || !deliveryTime.hour);
  }, [isSameDay, hasDeliveryTimes, deliveryTime]);

  useEffect(() => {
    if (isSameDay) {
      const level4Places = places?.map((place) => ({
        placeId: place.placeId,
        name: place.label,
      }));
      setAvailableLevel4(level4Places || []);
    }
  }, [isSameDay, places]);

  useEffect(() => {
    if (isSameDay) {
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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isAddToCartDisabled =
    isButtonDisableForLocation() || isButtonDisableForTime();
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
          <div className="absolute flex items-center justify-center w-10 h-10 rounded-full left-3 top-3 bg-amber-100 text-amber-700">
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
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

      {isSameDay && places?.length === 0 && (
        <Alert variant="destructive" className="mt-2">
          <Truck />
          <AlertTitle>Dikkat!</AlertTitle>
          <AlertDescription>
            Bu ürün için aynı gün teslimat bölgesi bulunmamaktadır.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex my-2 space-x-2">
        <Button
          size="lg"
          variant={!validationState.isValid ? "destructive" : "default"}
          className={clsx("flex basis-4/5 items-center justify-center px-0")}
          disabled={isAddToCartDisabled}
          onClick={handleAddToBasket}
          loading={isAddToCartLoading}
        >
          {isSameDay && places?.length === 0 && !hasDeliveryTimes
            ? "Bu ürün için gönderim yeri mevcut değil"
            : "Sepete Ekle"}
        </Button>

        <Button
          size="lg"
          className="flex items-center justify-center px-0 basis-1/5"
          variant={isFavoriteState ? "destructive" : "outline"}
          icon={
            isFavoriteState ? (
              <Heart className="w-8 h-8 text-white fill-red-500" />
            ) : (
              <Heart className="w-8 h-8 text-red-500" />
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
