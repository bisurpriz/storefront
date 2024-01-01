"use client";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import Button from "@/components/Button";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";

interface Props {
  productId: number;
  favorite: {
    isFavorite: boolean;
    id: number; // primary key
  };
  favoriteCount?: number;
}

const ProductActions = ({ productId, favorite, favoriteCount }: Props) => {
  const [isFavoriteState, setIsFavoriteState] = useState(favorite?.isFavorite);
  const { handleRedirect } = useAuthRedirect({ lazy: true });
  return (
    <div className="flex items-center justify-start gap-4 py-4 md:mt-4 font-mono">
      <Button
        size="large"
        color="primary"
        className="text-xl pl-16 pr-16 max-sm:w-full"
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
          onClick={() =>
            handleRedirect(() => {
              favorite?.isFavorite
                ? removeFromFavorites({ productId })
                : addToFavorites({ productId });
              setIsFavoriteState((prev) => !prev);
            })
          }
        ></Button>
        <p className="text-sm leading-none text-slate-400 mt-0 max-w-[100px] max-lg:hidden">
          <strong>{favoriteCount ?? 0}</strong> Favori
        </p>
      </div>
    </div>
  );
};

export default ProductActions;
