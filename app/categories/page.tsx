"use client";

import { useCategory } from "@/contexts/CategoryContext";
import clsx from "clsx";
import Image from "next/image";
import { Link } from "@/components/Link";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

const CategoriesPage = () => {
  const { category } = useCategory();

  if (!category) {
    return (
      <div className="grid gap-6 md:gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "group relative overflow-hidden rounded-lg",
                "border border-border bg-background",
              )}
            >
              <div className="h-60 w-full bg-gray-200" />
              <div className="bg-background p-4">
                <div className="mb-4 h-4 w-24 rounded-lg bg-gray-200" />
                <div className="h-2 w-24 rounded-lg bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="grid gap-6 md:gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
          {category.map((category) => (
            <div
              className={clsx(
                "group relative overflow-hidden rounded-lg",
                "border border-border bg-background",
              )}
              key={category.slug}
            >
              <Link
                href={`/${category.slug}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">{category.name}</span>
              </Link>
              <Image
                src={
                  getImageUrlFromPath(category.image_url) ??
                  "https://via.placeholder.com/400x300"
                }
                alt={category.name}
                width={400}
                height={300}
                className="h-60 w-full object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="bg-background p-4">
                <h3 className="text-lg font-semibold md:text-xl">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;
