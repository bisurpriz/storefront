import { getUserFavorites } from "./actions";
import clsx from "clsx";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Link from "next/link";
import { goToProductDetail } from "@/utils/linkClickEvent";

export const dynamic = "force-dynamic";

const FavoritesPage = async () => {
  const { user_favorite, totalCount } = await getUserFavorites({
    offset: 0,
  });

  return (
    <div>
      <h1
        className={clsx(
          "text-2xl",
          "text-slate-900",
          "mb-4",
          "max-sm:text-xl",
          "max-sm:mb-2"
        )}
      >
        Favorilerim ({totalCount})
      </h1>
      <div className="flex gap-4 items-start justify-start flex-wrap font-sans">
        {user_favorite?.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "flex justify-between gap-2",
              "bg-white overflow-hidden",
              "rounded-md",
              "shadow-md",
              "max-w-xs w-full",
              "group",
              "select-none"
            )}
          >
            <Image
              src={getImageUrlFromPath(item.product.image_url[0])}
              alt={item.product.name}
              className="w-24 h-24 object-cover -inset-0 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              width={96}
              height={96}
            />
            <div
              className={clsx(
                "flex flex-col gap-2 p-2",
                "flex-1",
                "justify-between"
              )}
            >
              <h1
                className={clsx(
                  "text-xs font-normal",
                  "text-gray-600",
                  "line-clamp-3"
                )}
              >
                {item.product.name}
              </h1>
              <Link
                href={goToProductDetail({
                  category: {
                    slug: item.product.product_categories[0].category.slug,
                  },
                  id: item.product.id,
                  slug: item.product.slug,
                })}
                className={clsx(
                  "p-2 w-full mt-auto",
                  "text-center text-xs",
                  "bg-tertiary",
                  "text-slate-500",
                  "rounded-md",
                  "hover:bg-tertiary-light hover:text-slate-700",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                Ürünü Gör
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
