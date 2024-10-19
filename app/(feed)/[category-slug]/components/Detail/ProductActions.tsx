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
import { checkProductLocation } from "@/app/(feed)/actions";
import { useProgress } from "react-transition-progress";
import HeartFill from "@/components/Icons/HeartFill";

interface Props {
  productId: number;
  isFavorite: boolean;
  favoriteCount?: number;
  locationId: number;
  locType: string;
}

const ProductActions = ({
  productId,
  isFavorite,
  favoriteCount,
  locType,
  locationId,
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
  const timeoutRef = useRef<NodeJS.Timeout>();

  const willShowError =
    !deliveryTime?.day || !deliveryTime?.hour || showPlaceWarning;

  useEffect(() => {
    if (!locationId || !locType) return;

    checkProductLocation(locationId, locType, productId).then((isAvailable) => {
      if (!isAvailable) {
        setShowPlaceWarning(true);
      } else {
        setShowPlaceWarning(false);
      }
    });
  }, [locationId, locType]);

  return (
    <>
      {showPlaceWarning && (
        <div className="p-2 px-4 max-md:py-1 max-md:px-2 bg-purple-100 bg-opacity-50 rounded-md my-2">
          <p className="text-xs text-slate-700 font-normal">
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
          </p>
        </div>
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
              !locationId
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
                    id: locationId,
                    type: locType,
                  },
                });
              }
              return;
            }
            addToCart({
              id: productId,
              type: "add",
              deliveryLocation: {
                id: locationId,
                type: locType,
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
