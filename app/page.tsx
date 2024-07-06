import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import { getBanners, getLocationFromCookie } from "./actions";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import { query } from "@/graphql/lib/client";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
} from "@/graphql/generated";
import QuarterSelector from "@/components/QuarterSelector";
import LandingSearchBanner from "@/components/LandingSearchBanner";
import clsx from "clsx";
import { getAvailableLocation } from "./account/addresses/actions";
import Filter from "@/components/Filter";
import InfinityScroll from "@/components/InfinityScroll";
import { searchProducts } from "./(feed)/actions";
import FilterSuspense from "@/components/Filter/FilterSuspense";
import { Suspense } from "react";
import CategorySwiperSuspense from "@/components/SwiperExamples/CategorySwiper/CategorySwiperSuspense";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { banners } = await getBanners();
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery>({
    query: GetAllCategoriesDocument,
  });

  const { products, totalCount } = await searchProducts(
    {
      offset: 0,
      limit: 15,
    },
    searchParams
  );

  const searchText = searchParams["search"];
  const location = await getLocationFromCookie();

  const data = await getAvailableLocation(location);

  const value = data?.value;

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
          <CategorySwiper categories={category} />
        </Suspense>
      )}
      <div
        className={clsx(
          "grid grid-cols-12 gap-4 w-full mb-4",
          "bg-white p-4 rounded-md border border-gray-100",
          "max-md:p-0 max-md:border-none"
        )}
      >
        <div
          className={clsx(
            "col-span-7 max-xl:col-span-full self-center",
            "text-2xl font-semibold text-gray-800"
          )}
        >
          <QuarterSelector value={value} />
        </div>
        <LandingSearchBanner />
      </div>
      {!searchText && <CampaignGrid banners={banners} />}
      <InfinityScroll
        totalCount={totalCount}
        initialData={products}
        dataKey="products"
        query={searchProducts}
        params={searchParams}
      />
    </>
  );
}
