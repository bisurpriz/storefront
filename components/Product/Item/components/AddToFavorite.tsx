"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/account/favorites/actions";
import { Button } from "@/components/ui/button";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface AddToFavoriteProps {
  isFav: boolean;
  productId: number;
  user?: GetUserByIdQuery["user_by_pk"];
}

const AddToFavorite = ({ isFav, productId, user }: AddToFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(isFav);
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFavorite = () => {
    if (isPending) return;

    startTransition(() => {
      if (!user) {
        push("/login");
        return;
      }

      if (isFavorite) {
        removeFromFavorites({ productId }).catch(() => {
          setIsFavorite(true);
        });
        setIsFavorite(false);

        return;
      }

      addToFavorites({ productId })
        .catch(() => {
          setIsFavorite(false);
        })
        .catch(() => {
          setIsFavorite(true);
        });
      setIsFavorite(true);
    });
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2 z-10"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleFavorite();
      }}
    >
      <Heart
        className={cn(
          "h-6 w-6",
          isFav ? "fill-red-500 text-red-500" : "text-gray-400",
        )}
      />
    </Button>
  );
};

export default AddToFavorite;
