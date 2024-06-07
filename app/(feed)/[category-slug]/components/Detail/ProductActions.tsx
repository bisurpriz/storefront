"use client";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { ProductForCart } from "@/common/types/Cart/cart";
import Button from "@/components/Button";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";

interface Props {
  product: ProductForCart;
  favorite: {
    isFavorite: boolean;
    id: number;
  };
  favoriteCount?: number;
}

const ProductActions = ({ product, favorite, favoriteCount }: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(favorite?.isFavorite);
  const { user } = useUser();

  const { addToCart } = useCart();
  const { push } = useRouter();
  const handleFavorite = () => {
    if (!user) {
      push("/login");
      return;
    }

    if (isFavoriteState) {
      removeFromFavorites({ productId: product.id });
      setIsFavoriteState(false);

      return;
    }

    addToFavorites({ productId: product.id });
    setIsFavoriteState(true);
  };

  return (
    <div className="flex items-center justify-start gap-4 py-4 md:mt-4 font-mono">
      <Button
        size="large"
        color="primary"
        className="text-xl max-sm:w-full max-sm:justify-center"
        onClick={() => addToCart(product, "add")}
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
            <MdFavoriteBorder
              className={`text-red-300 group-hover:text-white group-hover:animate-bounce ${
                isFavoriteState ? "text-white" : ""
              }`}
            />
          }
          onClick={handleFavorite}
        />
        <p className="text-sm leading-none text-slate-400 mt-0 max-w-[100px] max-lg:hidden">
          <strong>{favoriteCount ?? 0}</strong> Favori
        </p>
      </div>
    </div>
  );
};

export default ProductActions;
