import SearchDefaultView from "@/components/Search/SearchDefaultView";
import { Product } from "@/graphql/generated-types";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

interface SearchResultsProps {
  products: Product[];
  onSelect: (result: any) => void;
}

export function SearchResults({ products, onSelect }: SearchResultsProps) {
  if (products.length === 0) {
    return <SearchDefaultView />;
  }

  return (
    <div className="h-[40dvh] w-full cursor-pointer overflow-hidden overflow-y-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex max-h-32 items-center space-x-3 rounded-lg p-4 transition-colors duration-200 hover:bg-gray-100"
          onClick={() => onSelect(product)}
        >
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={getImageUrlFromPath(product.image_url?.[0])}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              priority
            />
          </div>
          <div className="min-w-0 flex-grow">
            <div className="flex flex-col items-start justify-start">
              <h3 className="max-w-sm truncate text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              {product.tenant?.tenants[0]?.name && (
                <span className="text-xs font-semibold text-tertiary">
                  {product.tenant.tenants[0].name}
                </span>
              )}
            </div>
            <span
              className="[&_p]:line-clamp-2 [&_p]:text-sm [&_p]:text-gray-500"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="mt-1 flex items-center">
              <span className="text-sm font-semibold text-gray-900">
                {product.price ? `₺${product.price}` : "Fiyat bilgisi yok"}
              </span>
              {product.discount_price && (
                <span className="ml-2 text-xs text-green-600 line-through">
                  ₺{product.discount_price}
                </span>
              )}
            </div>
          </div>
          <div className="flex w-fit flex-1 flex-col items-end">
            {product.score > 0 && (
              <div className="flex items-center">
                <Star
                  className={cn("mr-1 h-4 w-4 fill-yellow-400 text-yellow-400")}
                />
                <span className="text-sm text-gray-600">
                  {product.score.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
