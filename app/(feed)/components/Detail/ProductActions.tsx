"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { IPlace } from "@/common/types/Product/product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { parseJson } from "@/utils/format";
import clsx from "clsx";
import { Heart, Truck } from "lucide-react";
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
  const [error, setError] = useState(false);

  const { user } = useUser();
  const { addToCart, loading, deliveryTime } = useCart();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const startProgress = useProgress();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isSameDay = delivery_type === "SAME_DAY";
  const hasDeliveryTimes = Boolean(parseJson(delivery_time_ranges)?.length > 0);

  const handleFavorite = useCallback(() => {
    startTransition(() => {
      startProgress();
      if (!user) {
        push("/login");
        return;
      }

      const action = isFavoriteState ? removeFromFavorites : addToFavorites;
      action({ productId }).catch(() => {
        setIsFavoriteState(!isFavoriteState);
      });
      setIsFavoriteState(!isFavoriteState);
    });
  }, [isFavoriteState, user, productId, push, startProgress]);

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
    const isValidDeliveryTime =
      !hasDeliveryTimes || (deliveryTime.day && deliveryTime.hour);
    const isValidLocation =
      !isSameDay || (selectedLocation && places?.length > 0);

    if (isValidDeliveryTime && isValidLocation) {
      startTransition(() => {
        startProgress();
        addToCart(getCartPayload());
      });
      return;
    }

    setError(true);
    timeoutRef.current = setTimeout(() => setError(false), 3000);
  }, [
    hasDeliveryTimes,
    isSameDay,
    selectedLocation,
    places,
    addToCart,
    getCartPayload,
    startProgress,
  ]);

  const isAddToCartLoading = isPending || loading;

  const isButtonDisableForLocation = useCallback(() => {
    if (!isSameDay) return false;

    const getComponent = (type: string) =>
      selectedLocation?.address_components?.find((x) =>
        x?.types?.includes(type),
      )?.short_name;

    const selectedLevel4 = getComponent("administrative_area_level_4");
    const selectedLevel2 = getComponent("administrative_area_level_2");
    const selectedLevel1 = getComponent("administrative_area_level_1");

    if (selectedLevel4) {
      return !places?.some(
        (place) =>
          place?.addressComponents["administrative_area_level_4"] ===
          selectedLevel4,
      );
    }

    if (selectedLevel2) {
      return !places?.some(
        (place) =>
          place?.addressComponents["administrative_area_level_2"] ===
          selectedLevel2,
      );
    }

    return !places?.some(
      (place) =>
        place?.addressComponents["administrative_area_level_1"] ===
        selectedLevel1,
    );
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

  const locationValidationInProgress = isPending && isSameDay;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isAddToCartDisabled =
    isButtonDisableForLocation() || isButtonDisableForTime();

  const shouldShowDeliveryLocations =
    !selectedLocation || isButtonDisableForLocation();

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
          <AlertTitle>Dikkat !</AlertTitle>
          <AlertDescription>
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
            {locationValidationInProgress && " (Kontrol ediliyor...)"}
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
          variant={error ? "destructive" : "default"}
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
      {error && (
        <p
          className={clsx(
            "mt-2 text-sm font-semibold text-red-600",
            error ? "animate-bounce" : "",
          )}
        >
          Lütfen teslimat tarihi ve zamanını seçiniz.
        </p>
      )}
    </>
  );
};

export default memo(ProductActions);
