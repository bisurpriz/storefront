import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import Filter from "@/components/Filter";
import FilterSuspense from "@/components/Filter/FilterSuspense";
import { Suspense } from "react";
import CategorySwiperSuspense from "@/components/SwiperExamples/CategorySwiper/CategorySwiperSuspense";
import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import ServerCategorySwiper from "@/components/SwiperExamples/CategorySwiper/ServerCategorySwiper";
import ServerQuerySelector from "@/components/QuarterSelector/ServerQuerySelector";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";

export const dynamic = "force-dynamic";

export const experimental_ppr = true;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchText = searchParams.hasOwnProperty("search");

  return (
    <>
      {searchText && (
        <Suspense fallback={<FilterSuspense />}>
          <Filter filterTypes={["price", "sameDayDelivery", "customizable"]} />
        </Suspense>
      )}
      {!searchText && (
        <Suspense fallback={<CategorySwiperSuspense />}>
          <ServerCategorySwiper />
        </Suspense>
      )}
      {!searchText && (
        <Suspense
          fallback={
            <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg mb-2" />
          }
        >
          <ServerQuerySelector />
        </Suspense>
      )}
      <Suspense fallback={<CampaignGridSuspense />}>
        {!searchText && <CampaignGrid />}
      </Suspense>
      <Suspense
        fallback={
          <div className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 max-sm:gap-2 pb-2">
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
    </>
  );
}
