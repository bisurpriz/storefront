import { Link } from "@/components/Link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { goToProductDetail } from "@/utils/linkClickEvent";
import Image from "next/image";
import { useState } from "react";

interface Variant {
  variantId: number;
  variantSlug: string;
  name: string;
  price: number;
  imageUrl: string;
  categorySlug: string;
}

interface ProductVariantSelectorProps {
  variants: Variant[];
}

export default function ProductVariantSelector({
  variants,
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="my-4 w-full"
    >
      <CarouselContent>
        {variants.map((variant) => (
          <CarouselItem key={variant.variantId} className="basis-1/3">
            <Link
              prefetch
              href={goToProductDetail({
                category: {
                  slug: variant.categorySlug,
                },
                slug: variant.variantSlug,
                id: variant.variantId,
              })}
              key={variant.variantId}
              onClick={() => handleVariantSelect(variant)}
              className={cn(
                "flex basis-1/3 flex-col items-start space-y-2 rounded-lg border p-2 transition-all",
              )}
              aria-pressed={selectedVariant?.variantId === variant.variantId}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={getImageUrlFromPath(variant.imageUrl)}
                  alt={variant.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md"
                />
                <span className="line-clamp-2 h-8 text-xs font-medium">
                  {variant.name}
                </span>
              </div>
              <span className="mt-auto text-xs text-gray-500">
                {variant.price.toFixed(2)} TL
              </span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
