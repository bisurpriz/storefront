"use client";

import { useCategory } from "@/contexts/CategoryContext";
import clsx from "clsx";
import Image from "next/image";
import { Link } from "@/components/Link";

const CategoriesPage = () => {
  const { category } = useCategory();

  if (!category) {
    return (
      <div className="grid gap-6 md:gap-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "relative overflow-hidden rounded-lg group",
                "bg-background border border-border"
              )}
            >
              <div className="w-full h-60 bg-gray-200" />
              <div className="p-4 bg-background">
                <div className="w-24 h-4 bg-gray-200 rounded-lg mb-4" />
                <div className="w-24 h-2 bg-gray-200 rounded-lg" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
          {category.map((category) => (
            <div
              className={clsx(
                "relative overflow-hidden rounded-lg group",
                "bg-background border border-border"
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
                  category.image_url ?? "https://via.placeholder.com/400x300"
                }
                alt={category.name}
                width={400}
                height={300}
                className="object-cover w-full h-60"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4 bg-background">
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
