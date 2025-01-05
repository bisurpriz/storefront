"use client";

import { Link } from "@/components/Link";
import { GetProductsWithPaginationQuery } from "@/graphql/queries/products/getProductsWithPagination.generated";
import { getProductDetailUrl } from "@/lib/utils";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getPriceTR } from "@/utils/getPriceTR";
import { getDiscountRate } from "@/utils/price";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Image from "next/image";
import { memo, useCallback, useRef } from "react";

type Product = GetProductsWithPaginationQuery["product"][0];
type RecommendedProductsProps = {
  products: GetProductsWithPaginationQuery["product"];
};

const ProductCard = memo(({ product }: { product: Product }) => {
  const discount = getDiscountRate(product.price, product.discount_price);
  const imageUrl = `${getImageUrlFromPath(
    product.image_url?.[0],
  )}?width=120&height=120&format=webp&quality=80`;

  const isDiscounted = product.discount_price < product.price;

  return (
    <Link
      className="group relative flex h-32 min-w-[340px] flex-1 rounded-xl border border-gray-100 bg-white p-3 transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
      href={getProductDetailUrl(product.slug!, product.id)}
      prefetch={false}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-xl bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
          %{discount} İNDİRİM
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square w-[120px] overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={product.name}
          width={120}
          height={120}
          loading="lazy"
          sizes="120px"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col items-end justify-between gap-2 pl-4">
        {/* Price Section */}
        <div className="flex flex-col items-end gap-1">
          {isDiscounted && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-none text-gray-400 line-through">
                {getPriceTR(product.discount_price)}
              </span>
            </div>
          )}
          <span className="text-xl font-bold leading-none text-primary">
            {getPriceTR(product.price)}
          </span>
        </div>

        {/* Product Name */}
        <h3
          className="line-clamp-2 max-w-[200px] text-right text-sm font-medium leading-snug tracking-tight text-gray-700 transition-colors group-hover:text-primary"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Category & Stock Info */}
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-600">
            {product.product_categories[0].category.name}
          </span>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  const handleScroll = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft +
      (direction === "right" ? scrollAmount : -scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  }, []);

  if (!products.length) return null;

  return (
    <section className="relative" aria-label="Önerilen Ürünler">
      <AnimatePresence>
        <motion.div
          key="progress-bar"
          className="sticky left-0 top-0 origin-left bg-secondary"
          style={{
            scaleX: scrollXProgress,
            height: 2,
          }}
        />
        <div key="container" className="relative">
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
            aria-label="Sola kaydır"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
            aria-label="Sağa kaydır"
          >
            →
          </button>
          <motion.div
            key="product-list"
            className="relative z-0 mt-2 flex snap-x snap-mandatory flex-nowrap items-start justify-start gap-4 overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "auto",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            ref={scrollContainerRef}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </AnimatePresence>
    </section>
  );
};

export default memo(RecommendedProducts);
