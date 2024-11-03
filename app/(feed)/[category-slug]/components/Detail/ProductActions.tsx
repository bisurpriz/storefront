"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { Button } from "@/components/ui/button";
import Heart from "@/components/Icons/Heart";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { parseJson } from "@/utils/format";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useProgress } from "react-transition-progress";
import HeartFill from "@/components/Icons/HeartFill";
import { IPlace } from "@/common/types/Product/product";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeCheck, Truck } from "lucide-react";
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

  const willShowError =
    !deliveryTime?.day || !deliveryTime?.hour || showPlaceWarning;

  useEffect(() => {
    startTransition(() => {
      validateLocation(
        selectedLocation,
        places,
        isSameDay,
        setShowPlaceWarning
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
    }[]
  ) => {
    const availablePlaces = places?.map(
      (place) => place.addressComponents["administrative_area_level_4"]
    );

    return availablePlaces?.findIndex(
      (x) =>
        x ===
        selectedLocation?.address_components?.find((x) =>
          x.types.includes("administrative_area_level_4")
        )?.short_name
    ) === -1
      ? availablePlaces
      : [];
  };

  const availableLevel4 =
    selectedLocation && isSameDay && getAvailableLevel4(places as any);

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

  return (
    <>
      {availableLevel4?.length > 0 && (
        <Alert variant="default">
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

      <div className="flex my-2 space-x-2">
        <Button
          size="lg"
          variant={error ? "destructive" : "default"}
          className={clsx("basis-4/5 flex items-center justify-center px-0")}
          disabled={
            isPending ||
            loading ||
            error ||
            (isSameDay && places?.length === 0 && !hasDeliveryTimes)
          }
          onClick={handleAddToBasket}
          loading={loading}
        >
          {isSameDay && places?.length === 0 && !hasDeliveryTimes
            ? "Bu ürün için gönderim yeri mevcut değil"
            : "Sepete Ekle"}
        </Button>
        {/* <Button
          size="lg"
          variant={error ? "destructive" : "secondary"}
          className={clsx("basis-4/5 flex items-center justify-center px-0")}
          disabled={loading || error || showPlaceWarning || isPending}
          loading={loading}
          onClick={() => console.log("Hemen Al butonuna tıklandı")}
        >
          Hemen Al
        </Button> */}

        <Button
          size="lg"
          className="basis-1/5 flex items-center justify-center px-0"
          variant={isFavoriteState ? "destructive" : "outline"}
          icon={
            isFavoriteState ? (
              <HeartFill className="w-8 h-8 text-white" />
            ) : (
              <Heart className="w-8 h-8 text-red-500" />
            )
          }
          onClick={handleFavorite}
        />
      </div>
      {error && (
        <p
          className={clsx(
            "text-sm font-semibold text-red-600 mt-2",
            error ? "animate-bounce" : ""
          )}
        >
          Lütfen teslimat tarihi ve zamanını seçiniz.
        </p>
      )}
    </>
  );
};

export default ProductActions;
