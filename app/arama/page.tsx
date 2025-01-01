import Filters from "@/components/Filters/Filters";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const searchQuery = params?.search;

  return {
    title: searchQuery
      ? `${searchQuery} için arama sonuçları - Bonnmarşe`
      : "Arama - Bonnmarşe",
    description: searchQuery
      ? `${searchQuery} için arama sonuçlarını görüntüleyin. En iyi fiyatlar ve hızlı teslimat seçenekleriyle Bonnmarşe'de alışveriş yapın.`
      : "Bonnmarşe'de aradığınız ürünleri bulun. En iyi fiyatlar ve hızlı teslimat seçenekleriyle güvenli alışveriş.",
    keywords: searchQuery
      ? `${searchQuery}, arama sonuçları, online alışveriş, ücretsiz kargo`
      : "arama, online alışveriş, ücretsiz kargo, güvenli alışveriş",
  };
}

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search;

  if (!searchQuery) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-lg text-muted-foreground">
          Arama yapmak için bir şeyler yazın
        </p>
      </div>
    );
  }

  const { device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <div className="lg:col-span-1">
          <Filters
            filterTypes={["price", "sameDayDelivery", "customizable"]}
            isMobile={isMobile}
          />
        </div>
        <div className="lg:col-span-4">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-6 pb-2 max-sm:gap-2 max-xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                {Array.from({
                  length: 5,
                }).map((_, i) => (
                  <ProductItemSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ServerInfinityScroll searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
