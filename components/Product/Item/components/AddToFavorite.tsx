import { addToFavorites } from "@/app/products/actions";
import Button from "@/components/Button";
import clsx from "clsx";
import { useState } from "react";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface AddToFavoriteProps {
  isFavorite: boolean;
  productId: number;
}

const AddToFavorite = ({ isFavorite, productId }: AddToFavoriteProps) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  return (
    <Button
      onClick={() => addToFavorites({ productId }).then(() => setIsFavoriteState((prev) => !prev))}
      variant="link"
      color="secondary"
      size="large"
      icon={isFavoriteState ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
      className={clsx([
        isFavoriteState ? "animate-pulse" : "",
        "!absolute top-2 right-2 !p-0 shadow-lg shadow-cyan-500/50 rounded-full",
      ])}
      style={{
        animationIterationCount: 2,
      }}
      title="Favorilere Ekle"
      aria-label="Favorilere Ekle"
    />
  );
};

export default AddToFavorite;
