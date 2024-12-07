"use client";

import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/graphql/generated-types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import ProductItemv2 from "../Product/Item/ProductItemv2";

export default function InfiniteProductCarousel({
  initialProducts,
  fetchMoreProducts,
  params,
  totalCount,
}: {
  initialProducts: Product[];
  fetchMoreProducts: typeof searchProductsv1;
  params: { [key: string]: string | string[] | undefined };
  totalCount: number;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offset, setOffset] = useState(initialProducts.length);
  const [isPending, startTransition] = useTransition();

  const observerTarget = useRef(null);

  const loadMoreProducts = useCallback(async () => {
    const next = offset + PER_REQUEST;
    startTransition(async () => {
      const response = await fetchMoreProducts(
        {
          offset: next,
          limit: PER_REQUEST,
        },
        params,
      );

      if (response?.hits?.length! > 0) {
        setOffset(next);
        setProducts((prev) => [
          ...prev,
          ...(response?.hits?.map((p) => p.document) as Product[]),
        ]);
      }
    });
  }, [isPending, offset, fetchMoreProducts, params]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (
            !isPending &&
            products.length <= totalCount &&
            totalCount > offset + PER_REQUEST
          )
            loadMoreProducts();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMoreProducts]);

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
            >
              <ProductItemv2 {...product} />
            </CarouselItem>
          ))}
          <CarouselItem
            ref={observerTarget}
            className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
          >
            {isPending && (
              <div className="flex h-full items-center justify-center">
                Yükleniyor...
              </div>
            )}
            {totalCount <= offset + PER_REQUEST && (
              <div
                className={cn(
                  "flex h-full items-center justify-center",
                  "text-gray-500",
                  "text-sm",
                  "font-semibold",
                  "cursor-pointer",
                  "bg-gray-100",
                  "transition-colors",
                  "rounded-md",
                  "animate-pulse",
                )}
              >
                Tümünü Göster <ArrowRight size={16} />
              </div>
            )}
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
