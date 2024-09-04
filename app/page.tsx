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
  const searchText = searchParams["search"];

  return (
    <>
      {searchText && (
        <Suspense fallback={<FilterSuspense />}>
          <Filter
            filterTypes={[
              "price",
              "sameDayDelivery",
              "specialOffers",
              "customizable",
            ]}
          />
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
            <>
              <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg" />
              <div className="my-4 flex items-center justify-between gap-6">
                {Array.from({
                  length: 3,
                }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-32 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </>
          }
        >
          <ServerQuerySelector />
        </Suspense>
      )}
      <Suspense fallback={<CampaignGridSuspense />}>
        {!searchText && <CampaignGrid />}
      </Suspense>
      <Suspense
        fallback={Array.from({
          length: 15,
        }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      >
        <ServerInfinityScroll searchParams={searchParams} />
      </Suspense>
    </>
  );
}
