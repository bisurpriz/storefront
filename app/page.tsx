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
import { getAvailableLocation } from "./account/addresses/actions";
import Filter from "@/components/Filter";
import InfinityScroll from "@/components/InfinityScroll";
import { searchProducts } from "./(feed)/actions";
import FilterSuspense from "@/components/Filter/FilterSuspense";
import { Suspense } from "react";
import CategorySwiperSuspense from "@/components/SwiperExamples/CategorySwiper/CategorySwiperSuspense";
import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";

export const dynamic = "force-dynamic";

export const experimental_ppr = true;

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
      <Suspense fallback={<CategorySwiperSuspense />}>
        <CategorySwiper categories={category} />
      </Suspense>

      <QuarterSelector value={value} />
      <LandingSearchBanner />
      <Suspense fallback={<CampaignGridSuspense />}>
        {!searchText && <CampaignGrid banners={banners} />}
      </Suspense>
      <Suspense
        fallback={Array.from({
          length: 15,
        }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      >
        <InfinityScroll
          totalCount={totalCount}
          initialData={products}
          dataKey="products"
          query={searchProducts}
          params={searchParams}
        />
      </Suspense>
    </>
  );
}
