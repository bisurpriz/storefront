"use client";

import {
  addToFavorites,
  removeFromFavorites,
} from "@/app/(account)/account/favorites/actions";
import { Button } from "@/components/ui/button";
import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface AddToFavoriteProps {
  isFav: boolean;
  productId: number;
  user?: GetUserByIdQuery["user_by_pk"];
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const AddToFavorite = ({
  isFav,
  productId,
  user,
  onFavoriteChange,
}: AddToFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(isFav);
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  // isFav prop'u değiştiğinde state'i güncelle
  useEffect(() => {
    setIsFavorite(isFav);
  }, [isFav]);

  const handleFavorite = () => {
    if (isPending) return;

    startTransition(() => {
      if (!user) {
        push("/login");
        return;
      }

      // Optimistik güncelleme
      const newState = !isFavorite;
      setIsFavorite(newState);
      onFavoriteChange?.(newState);

      // API çağrısı
      const action = newState ? addToFavorites : removeFromFavorites;
      action({ productId }).catch(() => {
        // Hata durumunda geri al
        setIsFavorite(!newState);
        onFavoriteChange?.(!newState);
      });
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
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400",
        )}
      />
    </Button>
  );
};

export default AddToFavorite;
