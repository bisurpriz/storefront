"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useResponsive from "@/hooks/useResponsive";
import { getImageUrlFromPath } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => (
  <Card className="mx-2 w-full flex-shrink-0">
    <CardHeader>
      <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative h-48 w-full">
        <Image
          src={getImageUrlFromPath(product.image)}
          alt={product.name}
          className="rounded object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <p className="mt-4 text-xl font-bold">{product.price.toFixed(2)} TL</p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Sepete Ekle</Button>
    </CardFooter>
  </Card>
));

ProductCard.displayName = "ProductCard";

interface CarouselButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: "left" | "right";
  isLoading?: boolean;
}

const CarouselButton = memo(
  ({ onClick, disabled, direction, isLoading }: CarouselButtonProps) => (
    <Button
      variant="outline"
      size="icon"
      className={`absolute top-1/2 -translate-y-1/2 transform ${
        direction === "left"
          ? "left-0 -translate-x-1/2"
          : "right-0 translate-x-1/2"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Önceki ürünler" : "Sonraki ürünler"}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary" />
      ) : direction === "left" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  ),
);

CarouselButton.displayName = "CarouselButton";

const SLIDES_PER_VIEW = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
  wide: 5,
} as const;

const INITIAL_CAROUSEL_OPTIONS = {
  align: "start" as const,
  skipSnaps: false,
  dragFree: true,
} as const;

export default function FeaturedProductsCarousel() {
  const { isDesktop } = useResponsive();
  const [emblaRef, emblaApi] = useEmblaCarousel(INITIAL_CAROUSEL_OPTIONS);

  const { products, isLoading, error, fetchProducts } = useAsyncProducts();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isSettlingRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit({
      ...INITIAL_CAROUSEL_OPTIONS,
      slidesToScroll: isDesktop
        ? SLIDES_PER_VIEW.desktop
        : SLIDES_PER_VIEW.mobile,
    });
  }, [emblaApi, isDesktop]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const checkAndLoadMore = useCallback(() => {
    if (!emblaApi || isLoading || isSettlingRef.current) return;

    const lastSlide = emblaApi.slidesInView().slice(-1)[0];
    if (!lastSlide) return;

    const isAtEnd = lastSlide + 1 === products.length;
    if (isAtEnd && !isLoading) {
      fetchProducts();
    }
  }, [emblaApi, isLoading, products.length, fetchProducts]);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      isSettlingRef.current = true;
    };

    const onSettle = () => {
      isSettlingRef.current = false;
      checkAndLoadMore();
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("settle", onSettle);
    emblaApi.on("scroll", onScroll);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("settle", onSettle);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, checkAndLoadMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
        Hata: {error}
      </div>
    );
  }

  return (
    <section className="px-4 py-12 md:px-6 lg:px-8">
      <h2 className="mb-6 text-center text-2xl font-bold">Öne Çıkan Ürünler</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] xl:flex-[0_0_25%] 2xl:flex-[0_0_20%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <CarouselButton
          direction="left"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        />

        <CarouselButton
          direction="right"
          onClick={scrollNext}
          disabled={!canScrollNext}
          isLoading={isLoading && !canScrollNext}
        />
      </div>
    </section>
  );
}

export function useAsyncProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = Array.from({ length: 5 }, (_, index) => {
        const random = Math.floor(Math.random() * 10000);
        return {
          id: random,
          name: `Product ${random}`,
          price: Math.floor(Math.random() * 500) + 100,
          image: ``,
        };
      });

      setProducts((prevProducts) => [...prevProducts, ...response]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu",
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { products, isLoading, error, fetchProducts };
}
