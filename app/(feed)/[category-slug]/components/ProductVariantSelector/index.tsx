import { Link } from "@/components/Link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { goToProductDetail } from "@/utils/linkClickEvent";
import Image from "next/image";

interface Variant {
  variantId: number;
  variantSlug: string;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  categorySlug: string;
}

interface ProductVariantSelectorProps {
  variants: Variant[];
}

export default function ProductVariantSelector({
  variants,
}: ProductVariantSelectorProps) {
  const calculateDiscount = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  if (!variants?.length) return null;

  return (
    <div className="relative w-full space-y-3 rounded-lg bg-white">
      <h2 className="text-sm font-semibold text-slate-600">
        Satıcının belirttiği ürün varyasyonları
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: false,
          slidesToScroll: 1,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {variants.map((variant) => {
            const hasDiscount =
              variant.discountPrice && variant.discountPrice < variant.price;
            const discountPercentage = hasDiscount
              ? calculateDiscount(variant.price, variant.discountPrice!)
              : 0;

            return (
              <CarouselItem
                key={variant.variantId}
                className="basis-1/3 pl-3 lg:basis-1/5"
              >
                <Link
                  prefetch
                  href={goToProductDetail({
                    category: {
                      slug: variant.categorySlug,
                    },
                    slug: variant.variantSlug,
                    id: variant.variantId,
                  })}
                  className={cn(
                    "group relative flex h-full flex-col rounded-lg border bg-white p-2 shadow-sm transition-all duration-200",
                  )}
                >
                  {hasDiscount && (
                    <div className="absolute left-1.5 top-1.5 z-10">
                      <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                        %{discountPercentage}
                      </span>
                    </div>
                  )}

                  <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={getImageUrlFromPath(variant.imageUrl)}
                      alt={variant.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-2">
                    <h3 className="line-clamp-2 h-8 text-xs font-medium text-gray-700">
                      {variant.name}
                    </h3>

                    <div className="flex flex-col items-baseline">
                      {hasDiscount && (
                        <span className="text-xs text-gray-500 line-through">
                          ₺{variant.discountPrice!.toFixed(2)}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-primary">
                        ₺{variant.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
