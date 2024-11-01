"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { Button } from "@/components/ui/button";
import Heart from "@/components/Icons/Heart";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/contexts/ProductContext";
import { parseJson } from "@/utils/format";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, startTransition } from "react";
import { useProgress } from "react-transition-progress";
import HeartFill from "@/components/Icons/HeartFill";
import { IPlace } from "@/common/types/Product/product";
import { isWithinBounds } from "@/utils/isWithinBounds";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Truck } from "lucide-react";

interface Props {
  productId: number;
  isFavorite: boolean;
  favoriteCount?: number;
  places: IPlace[];
  selectedLocation: IPlace;
}

const ProductActions = ({
  productId,
  isFavorite,
  favoriteCount,
  places,
  selectedLocation,
}: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [showPlaceWarning, setShowPlaceWarning] = useState(false);
  const { user } = useUser();
  const { selectedProduct } = useProduct();

  const { addToCart, loading, deliveryTime } = useCart();
  const { replace } = useRouter();
  const startProgress = useProgress();

  const handleFavorite = () => {
    startTransition(() => {
      startProgress();
      if (!user) {
        replace("/login");
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
    if (!selectedLocation) return;

    const anyAvailable = places?.some((place) => {
      if (place.placeId === selectedLocation.placeId) {
        return true;
      }

      const {
        viewport: { south, north, east, west },
        lat,
        lng,
      } = place;
      const {
        lat: selectedLat,
        lng: selectedLng,
        viewport: {
          south: selectedSouth,
          north: selectedNorth,
          east: selectedEast,
          west: selectedWest,
        },
      } = selectedLocation;

      const isWithin1 = isWithinBounds(selectedLat, selectedLng, {
        south,
        north,
        east,
        west,
      });
      const isWithin2 = isWithinBounds(lat, lng, {
        south: selectedSouth,
        north: selectedNorth,
        east: selectedEast,
        west: selectedWest,
      });

      if (isWithin1 || isWithin2) {
        return true;
      }

      return false;
    });
    setShowPlaceWarning(!anyAvailable);
  }, [selectedLocation]);

  return (
    <>
      {showPlaceWarning && (
        <Alert variant="destructive">
          <Truck />
          <AlertTitle>Dikkat !</AlertTitle>
          <AlertDescription>
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-start gap-4 py-2 max-md:mt-2 max-md:py-2 max-md:pt-0 font-mono">
        <Button
          size="lg"
          variant={error ? "destructive" : "default"}
          className={clsx("w-full")}
          disabled={loading || error || showPlaceWarning}
          onClick={() => {
            if (
              parseJson(selectedProduct?.delivery_time_ranges)?.length > 0 ||
              !selectedLocation
            ) {
              if (willShowError) {
                setError(true);
                timeoutRef.current = setTimeout(() => {
                  setError(false);
                }, 3000);
              } else {
                addToCart({
                  id: productId,
                  type: "add",
                  deliveryLocation: {
                    id: 0,
                    type: "",
                  },
                });
              }
              return;
            }
            addToCart({
              id: productId,
              type: "add",
              deliveryLocation: {
                id: 0,
                type: "",
              },
            });
          }}
          loading={loading}
        >
          Sepete Ekle
        </Button>

        <div className="flex items-end gap-2 flex-1">
          <Button
            size="lg"
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
