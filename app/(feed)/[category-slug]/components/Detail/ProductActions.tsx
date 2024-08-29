"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import Button from "@/components/Button";
import Heart from "@/components/Icons/Heart";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/contexts/ProductContext";
import { parseJson } from "@/utils/format";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { checkProductLocation } from "@/app/(feed)/actions";

interface Props {
  productId: number;
  isFavorite: boolean;
  favoriteCount?: number;
}

const ProductActions = ({ productId, isFavorite, favoriteCount }: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const [showPlaceWarning, setShowPlaceWarning] = useState(false);
  const { user } = useUser();
  const { selectedProduct } = useProduct();

  const { addToCart, loading, deliveryTime } = useCart();
  const { push } = useRouter();
  const handleFavorite = () => {
    if (!user) {
      push("/login");
      return;
    }

    if (isFavoriteState) {
      removeFromFavorites({ productId });
      setIsFavoriteState(false);

      return;
    }

    addToFavorites({ productId });
    setIsFavoriteState(true);
  };

  const [error, setError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const willShowError = !deliveryTime?.day || !deliveryTime?.hour;

  const handleCookie = () => {
    try {
      const locationCookie = Cookies.get("location_id")
        ? parseJson(Cookies.get("location_id"))
        : null;
      return locationCookie;
    } catch (error) {
      console.error("Error while parsing location cookie", error);
      return null;
    }
  };

  const locationId = handleCookie()?.id;
  const locType = handleCookie()?.type;

  useEffect(() => {
    checkProductLocation(locationId, locType, productId).then((isAvailable) => {
      console.log("isAvailable", isAvailable);
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
        <div className="p-1 px-4 bg-1 bg-opacity-50 rounded-xl my-2">
          <p className="text-xs text-gray-500">
            Bu ürünün teslimatı seçtiğiniz bölgeye yapılamamaktadır.
          </p>
        </div>
      )}
      <div className="flex items-center justify-start gap-4 py-4 max-md:py-2 max-md:pt-0 font-mono">
        <Button
          size="large"
          color={error ? "error" : "primary"}
          className={clsx("text-base w-full justify-center sm:text-xl")}
          disabled={loading || error || !locationId || showPlaceWarning}
          onClick={() => {
            if (parseJson(selectedProduct?.delivery_time_ranges)?.length > 0) {
              if (willShowError) {
                setError(true);
                timeoutRef.current = setTimeout(() => {
                  setError(false);
                }, 3000);
              } else {
                addToCart({
                  id: productId,
                  type: "add",
                });
              }
              return;
            }
            addToCart({
              id: productId,
              type: "add",
            });
          }}
          loading={loading}
        >
          Sepete Ekle
        </Button>

        <div className="flex items-end gap-2 flex-1">
          <Button
            size="large"
            iconSize={28}
            variant="outlined"
            className={`group border-red-300 hover:bg-red-400 rounded-xl ${
              isFavoriteState ? "bg-red-400" : ""
            }`}
            icon={
              <Heart
                className={`text-red-300 group-hover:text-white ${
                  isFavoriteState ? "text-white" : ""
                }`}
              />
            }
            onClick={handleFavorite}
          />
          {favoriteCount > 0 && (
            <p className="text-sm leading-none text-slate-400 mt-0 max-w-[100px] max-lg:hidden whitespace-nowrap">
              <strong>{favoriteCount}</strong> Favori
            </p>
          )}
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
