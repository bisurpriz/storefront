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
import { memo, useCallback, useEffect, useRef, useState } from "react";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import ProductItemv2 from "../Product/Item/ProductItemv2";

interface InfiniteProductCarouselProps {
  readonly initialProducts: Product[];
  readonly fetchMoreProducts: typeof searchProductsv1;
  readonly params: { readonly [key: string]: string | string[] | undefined };
  readonly totalCount: number;
}

const LoadingItem = memo(() => (
  <CarouselItem className="basis-1/2 lg:basis-1/3 xl:basis-1/5">
    <ProductItemSkeleton />
  </CarouselItem>
));

LoadingItem.displayName = "LoadingItem";

const ProductItem = memo(({ product }: { product: Product }) => (
  <CarouselItem
    key={`${product.id}-${product.tenant?.tenants?.[0]?.id}`}
    className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
  >
    <ProductItemv2 {...product} />
  </CarouselItem>
));

ProductItem.displayName = "ProductItem";

const ShowAllButton = memo(({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    aria-label="Tümünü göster"
    className={cn(
      "flex h-full cursor-pointer items-center justify-center gap-2",
      "rounded-md bg-gray-100 text-sm font-medium text-gray-600",
      "w-full transition-colors hover:bg-gray-200",
    )}
  >
    Tümünü Göster <ArrowRight className="h-4 w-4" />
  </button>
));

ShowAllButton.displayName = "ShowAllButton";

function InfiniteProductCarousel({
  initialProducts,
  fetchMoreProducts,
  params,
  totalCount,
}: InfiniteProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > initialProducts.length);
  const observerTarget = useRef<HTMLDivElement>(null);

  const renderLastItem = () => {
    if (isLoading) return <LoadingItem />;
    if (hasMore) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300" />
        </div>
      );
    }
    return <ShowAllButton />;
  };

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetchMoreProducts(
        {
          offset: products.length,
          limit: PER_REQUEST,
        },
        params,
      );

      if (response?.hits?.length > 0) {
        const newProducts = response.hits.map((p) => p.document) as Product[];
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(totalCount > products.length + newProducts.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [
    fetchMoreProducts,
    hasMore,
    isLoading,
    params,
    products.length,
    totalCount,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProducts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMoreProducts]);

  // Reset state when params change
  useEffect(() => {
    setProducts(initialProducts);
    setHasMore(totalCount > initialProducts.length);
    setIsLoading(false);
  }, [initialProducts, totalCount, params]);

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        opts={{
          slidesToScroll: "auto",
          align: "start",
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <ProductItem
              key={`${product.id}-${product.tenant?.tenants?.[0]?.id}`}
              product={product}
            />
          ))}

          <CarouselItem
            ref={observerTarget}
            className="basis-1/2 lg:basis-1/3 xl:basis-1/5"
          >
            {renderLastItem()}
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}

export default memo(InfiniteProductCarousel);
