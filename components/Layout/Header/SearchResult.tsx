import SearchDefaultView from "@/components/Search/SearchDefaultView";
import { Category, Product } from "@/graphql/generated-types";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

interface SearchResultsProps {
  products: Product[];
  categories: Category[];
  onSelect: (result: any) => void;
  featuredProducts: Product[];
}

export function SearchResults({
  products,
  onSelect,
  categories,
  featuredProducts,
}: SearchResultsProps) {
  if (products.length === 0) {
    return (
      <SearchDefaultView
        categories={categories}
        featuredProducts={featuredProducts}
      />
    );
  }

  return (
    <div className="w-full cursor-pointer">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          className="flex items-center w-full p-4 space-x-3 text-left transition-colors duration-200 rounded-lg max-h-32 hover:bg-gray-100"
          onClick={() => onSelect(product)}
        >
          <div className="relative flex-shrink-0 w-20 h-20">
            <Image
              src={getImageUrlFromPath(product.image_url?.[0])}
              alt={product.name}
              fill
              sizes="80px"
              className="object-cover rounded-md"
              priority
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex flex-col items-start justify-start">
              <h3 className="max-w-sm text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              {product.tenant?.tenants[0]?.name && (
                <span className="text-xs font-semibold text-tertiary">
                  {product.tenant.tenants[0].name}
                </span>
              )}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-semibold text-gray-900">
                {product.price ? `₺${product.price}` : "Fiyat bilgisi yok"}
              </span>
              {Boolean(product.discount_price) && (
                <span className="ml-2 text-xs text-green-600 line-through">
                  ₺{product.discount_price}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end flex-1 w-fit">
            {product.score > 0 && (
              <div className="flex items-center">
                <Star
                  className={cn("mr-1 h-4 w-4 fill-yellow-400 text-yellow-400")}
                />
                <span className="text-sm text-gray-600">
                  {product.score > 5 ? "5.0" : product.score.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
