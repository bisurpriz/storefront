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
    <section className="bg-gradient-to-l from-white via-orange-100  to-white py-8 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 text-start">
          Öne Çıkan Ürünler
        </h2>
        <ScrollButtons />
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-scroll snap-x snap-mandatory no-scrollbar"
      >
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="snap-start">
            <div className="bg-white min-w-[240px] group relative block border rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={product.imageSrc}
                alt={product.name}
                className="object-cover w-full h-64"
                width={240}
                height={240}
              />
              {product.badge && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.badge}
                </div>
              )}
              <div className="p-4 pt-2">
                <h3 className="text-sm font-manrope h-10 line-clamp-2">
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
