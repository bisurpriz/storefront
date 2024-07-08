"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import Button from "@/components/Button";
import Heart from "@/components/Icons/Heart";
import HeartFill from "@/components/Icons/HeartFill";
import clsx from "clsx";
import { useState } from "react";

interface AddToFavoriteProps {
  isFavorite: boolean;
  productId: number;
}

const AddToFavorite = ({ isFavorite, productId }: AddToFavoriteProps) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const handleAddToFavorites = () => {
    if (isFavorite) {
      removeFromFavorites({ productId });
      setIsFavoriteState(false);
      return;
    }
    addToFavorites({ productId });
    setIsFavoriteState(true);
  };

  return (
    <Button
      onClick={() => handleAddToFavorites()}
      variant="link"
      color="secondary"
      size="large"
      icon={isFavoriteState ? <HeartFill /> : <Heart />}
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
