import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import HomePageGrid from "@/components/Grids/CampaignGrid/HomePageGrid";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import dynamicImport from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Suspense } from "react";

const CategorySwiper = dynamicImport(
  () => import("@/components/SwiperExamples/CategorySwiper"),
  {
    loading: () => (
      <div className="h-24 rounded-lg animate-pulse bg-primary/20" />
    ),
  },
);

const GoogleLocationSelect = dynamicImport(
  () => import("@/components/QuarterSelector/GoogleLocationSelect"),
);

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const { category } = await BonnmarseApi.request<GetAllCategoriesQuery>({
    query: GetCategoriesDocument,
    cache: {
      enable: true,
      duration: 24 * 60 * 60 * 1000,
    },
    tags: ["getCategories"],
    withAuth: false,
  });

  const { isBot, device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <div className="flex flex-col gap-4">
      {!(category.length < 8 && !isMobile) && (
        <Suspense fallback={<CategorySwiper categories={category} />}>
          <CategorySwiper categories={category} />
        </Suspense>
      )}

      {!isBot && (
        <Suspense
          fallback={
            <div className="w-full h-16 mb-2 rounded-lg animate-pulse bg-primary/20" />
          }
        >
          <GoogleLocationSelect from="home" />
        </Suspense>
      )}
      <Suspense fallback={<CampaignGridSuspense />}>
        <HomePageGrid />
      </Suspense>

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
  );
}
