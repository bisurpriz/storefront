"use client";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { ProductForCart } from "@/common/types/Cart/cart";
import Button from "@/components/Button";
import Heart from "@/components/Icons/Heart";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  productId: number;
  isFavorite: boolean;
  favoriteCount?: number;
}

const ProductActions = ({ productId, isFavorite, favoriteCount }: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const { user } = useUser();

  const { addToCart, loading } = useCart();
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

  return (
    <div className="flex items-center justify-start gap-4 py-4 font-mono">
      <Button
        size="large"
        color="primary"
        className="text-xl flex-1 justify-center"
        onClick={() =>
          addToCart({
            id: productId,
            type: "add",
          })
        }
        loading={loading}
      >
        Sepete Ekle
      </Button>
      <div className="flex items-end gap-2">
        <Button
          size="large"
          iconSize={28}
          variant="outlined"
          className={`group border-red-300 hover:bg-red-400 rounded-xl ${
            isFavoriteState ? "bg-red-400" : ""
          }`}
          icon={
            <Heart
              className={`text-red-300 group-hover:text-white group-hover:animate-bounce ${
                isFavoriteState ? "text-white" : ""
              }`}
            />
          }
          onClick={handleFavorite}
        />
        {favoriteCount > 0 && (
          <p className="text-sm leading-none text-slate-400 mt-0 max-w-[100px] max-lg:hidden">
            <strong>{favoriteCount}</strong> Favori
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductActions;
