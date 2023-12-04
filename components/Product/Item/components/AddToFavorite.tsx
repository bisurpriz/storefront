import Button from "@/components/Button";
import clsx from "clsx";
import React from "react";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface AddToFavoriteProps {
  isFavorite: boolean;
  onClick: () => void;
}

const AddToFavorite = ({ isFavorite, onClick }: AddToFavoriteProps) => {
  return (
    <Button
      onClick={onClick}
      variant="link"
      color="secondary"
      size="large"
      icon={isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
      className={clsx([
        isFavorite ? "animate-pulse" : "",
        "!absolute top-2 right-2 !p-0",
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
