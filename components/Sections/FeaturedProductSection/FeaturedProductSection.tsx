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
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ProductCard = ({ product }) => (
  <Card className="mx-2 w-full flex-shrink-0">
    <CardHeader>
      <CardTitle className="text-lg">{product.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <Image
        src={getImageUrlFromPath(product.image)}
        alt={product.name}
        className="mb-4 h-48 w-full object-cover"
        width={250}
        height={250}
      />
      <p className="text-xl font-bold">{product.price.toFixed(2)} TL</p>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Sepete Ekle</Button>
    </CardFooter>
  </Card>
);

export default function FeaturedProductsCarousel() {
  const { isDesktop } = useResponsive();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    if (isDesktop) {
      emblaApi.reInit({
        align: "start",
        loop: false,
        slidesToScroll: 4,
      });
    } else {
      emblaApi.reInit({
        align: "start",
        loop: false,
        slidesToScroll: 1,
      });
    }
  }, [isDesktop]);

  const { products, isLoading, error, fetchProducts } = useAsyncProducts();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isSettlingRef = useRef(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const checkAndLoadMore = useCallback(() => {
    if (!emblaApi || isLoading) return;

    const lastSlide = emblaApi.slidesInView().slice(-1)[0];
    if (!lastSlide) return;

    const isAtEnd = lastSlide + 1 === products.length;
    if (isAtEnd) {
      fetchProducts();
    }
  }, [emblaApi, isLoading, fetchProducts]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("settle", () => {
      isSettlingRef.current = false;
      checkAndLoadMore();
    });
    emblaApi.on("scroll", () => {
      isSettlingRef.current = true;
    });

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, checkAndLoadMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    return <div className="text-red-500">Hata: {error}</div>;
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
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Önceki ürünler"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Sonraki ürünler"
        >
          {isLoading ||
            (!canScrollNext && (
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
            ))}
          {canScrollNext && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
export function useAsyncProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
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
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { products, isLoading, error, fetchProducts };
}
