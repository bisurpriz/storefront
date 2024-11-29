"use client";

import PriceTag from "@/components/PriceTag";
import useScrollHorizontal from "@/hooks/useScrollHorizontal";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type FeaturedProduct = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  price: number;
  discountPrice?: number;
  badge?: string;
};

const FeaturedProducts = ({ products }: { products: FeaturedProduct[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ScrollButtons } = useScrollHorizontal(scrollRef, true);

  return (
    <section className="rounded-md bg-gradient-to-l from-white via-orange-100 to-white py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-start text-lg font-semibold text-gray-700">
          Öne Çıkan Ürünler
        </h2>
        <ScrollButtons />
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory space-x-6 overflow-x-scroll"
      >
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="snap-start">
            <div className="group relative block min-w-[240px] cursor-pointer overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.imageSrc}
                alt={product.name}
                className="h-64 w-full object-cover"
                width={240}
                height={240}
              />
              {product.badge && (
                <div className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  {product.badge}
                </div>
              )}
              <div className="p-4 pt-2">
                <h3 className="line-clamp-2 h-10 font-manrope text-sm">
                  {product.name}
                </h3>
                <PriceTag
                  price={product.price}
                  discount={product.discountPrice}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
