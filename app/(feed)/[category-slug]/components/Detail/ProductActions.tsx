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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
      <div className="flex my-2 space-x-2">
        <Button
          size="lg"
          variant={error ? "destructive" : "default"}
          className={clsx("basis-4/5 flex items-center justify-center px-0")}
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
        <Button
          size="lg"
          variant={error ? "destructive" : "secondary"}
          className={clsx("basis-4/5 flex items-center justify-center px-0")}
          disabled={loading || error || showPlaceWarning}
          loading={loading}
          onClick={() => console.log("Hemen Al butonuna tıklandı")}
        >
          Hemen Al
        </Button>

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
