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
import { BadgeCheck, Heart, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useProgress } from "react-transition-progress";
import { validateLocation } from "../utils/validateLocation";

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
  isFavorite,
  favoriteCount,
  places,
  selectedLocation,
  delivery_type,
  delivery_time_ranges,
}: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [showPlaceWarning, setShowPlaceWarning] = useState(false);
  const [availableLevel4, setAvailableLevel4] = useState<string[]>([]);
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const isSameDay = delivery_type === "SAME_DAY";

  const { addToCart, loading, deliveryTime } = useCart();
  const { push } = useRouter();
  const startProgress = useProgress();
  const handleFavorite = () => {
    startTransition(() => {
      startProgress();
      if (!user) {
        push("/login");
        return;
      }

      if (isFavoriteState) {
        removeFromFavorites({ productId });
        setIsFavoriteState(false);

        return;
      }

      addToFavorites({ productId }).catch(() => {
        setIsFavoriteState(false);
      });
      setIsFavoriteState(true);
    });
  };

  const [error, setError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    startTransition(() => {
      validateLocation(
        selectedLocation,
        places,
        isSameDay,
        setShowPlaceWarning,
      );
    });
  }, [selectedLocation]);

  const getAvailableLevel4 = (
    places: {
      addressComponents: {
        [key: string]: string;
      };
      label: string;
      placeId: string;
    }[],
  ) => {
    const availablePlaces = places?.map(
      (place) => place.addressComponents["administrative_area_level_4"],
    );

    return availablePlaces?.findIndex(
      (x) =>
        x ===
        selectedLocation?.address_components?.find((x) =>
          x.types.includes("administrative_area_level_4"),
        )?.short_name,
    ) === -1
      ? availablePlaces
      : [];
  };

  useEffect(() => {
    if (isSameDay) {
      setAvailableLevel4(getAvailableLevel4(places));
    }
  }, [places, selectedLocation]);

  const hasDeliveryTimes = Boolean(parseJson(delivery_time_ranges)?.length > 0);

  const handleAddToBasket = () => {
    if (
      isSameDay &&
      selectedLocation &&
      deliveryTime.day &&
      deliveryTime.hour &&
      hasDeliveryTimes &&
      places?.length > 0
    ) {
      addToCart({
        deliveryLocation: selectedLocation,
        id: productId,
        type: "add",
        deliveryDate: deliveryTime.day.toISOString(),
        deliveryTime: deliveryTime.hour,
        quantity: 1,
      });

      return;
    }

    if (isSameDay && !hasDeliveryTimes) {
      addToCart({
        id: productId,
        type: "add",
        quantity: 1,
        deliveryLocation: selectedLocation,
      });
      return;
    }

    if (!isSameDay) {
      addToCart({
        id: productId,
        type: "add",
        quantity: 1,
        deliveryLocation: selectedLocation,
      });
      return;
    }

    if (isSameDay && hasDeliveryTimes && selectedLocation) {
      addToCart({
        id: productId,
        type: "add",
        quantity: 1,
        deliveryDate: deliveryTime.day.toISOString(),
        deliveryTime: deliveryTime.hour,
        deliveryLocation: selectedLocation,
      });
      return;
    }

    setError(true);

    timeoutRef.current = setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const isButtonDisableForLocation = () => {
    if (!isSameDay) return false;
    if (isSameDay && !selectedLocation) return true;

    const selectedLevel4 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_4"),
    )?.short_name;

    const selectedLevel1 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_1"),
    )?.short_name;

    const selectedLevel2 = selectedLocation?.address_components?.find((x) =>
      x.types.includes("administrative_area_level_2"),
    )?.short_name;

    if (selectedLevel4) {
      const isLevel4Available = places?.some(
        (place) =>
          place?.addressComponents["administrative_area_level_4"] ===
          selectedLevel4,
      );

      if (!isLevel4Available) return true;
    } else if (selectedLevel2) {
      const isLevel2Available = places?.some(
        (place) =>
          place?.addressComponents["administrative_area_level_2"] ===
          selectedLevel2,
      );

      if (!isLevel2Available) return true;
    }
    {
      const isLevel1Available = places?.some(
        (place) =>
          place?.addressComponents["administrative_area_level_1"] ===
          selectedLevel1,
      );

      if (!isLevel1Available) return true;
    }
  };

  const isButtonDisableForTime = () => {
    if (!isSameDay) return false;
    if (isSameDay && !deliveryTime.day) return true;
    if (isSameDay && !deliveryTime.hour) return true;
  };

  return (
    <>
      {availableLevel4?.length > 0 && (
        <Alert variant="default" className="mt-2">
          <BadgeCheck />
          <AlertTitle>Uyarı !</AlertTitle>
          <AlertDescription>
            Bu ürün sadece <strong>"{availableLevel4.join(", ")}"</strong>{" "}
            mahallelerine teslimat yapılmaktadır.
          </AlertDescription>
        </Alert>
      )}
      {availableLevel4?.length === 0 && showPlaceWarning && (
        <Alert variant="destructive" className="mt-2">
          <Truck />
          <AlertTitle>Dikkat !</AlertTitle>
          <AlertDescription>
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
          </AlertDescription>
        </Alert>
      )}

      <div className="my-2 flex space-x-2">
        <Button
          size="lg"
          variant={error ? "destructive" : "default"}
          className={clsx("flex basis-4/5 items-center justify-center px-0")}
          disabled={isButtonDisableForLocation() || isButtonDisableForTime()}
          onClick={handleAddToBasket}
          loading={loading}
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

export default ProductActions;
