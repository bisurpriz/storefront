import { BannerCarousel } from "@/components/Grids/CampaignGrid/CampaignGrid";
import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import HomePageGrid from "@/components/Grids/CampaignGrid/HomePageGrid";
import InfiniteScrollCarouselWrapper from "@/components/InfiniteScrollCarousel/InfiniteScrollCarouselWrapper";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import GoogleLocationSelect from "@/components/QuarterSelector/GoogleLocationSelect";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Suspense } from "react";
import Filters from "./magaza/components/Filters";

export const experimental_ppr = true;

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const searchText = searchParams.hasOwnProperty("search");

  const { category } = await BonnmarseApi.request<GetAllCategoriesQuery>({
    query: GetCategoriesDocument,
  });

  const { isBot, device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  if (searchText) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!searchText && !(category.length < 8 && !isMobile) && (
        <Suspense fallback={<CategorySwiper categories={category} />}>
          <CategorySwiper categories={category} />
        </Suspense>
      )}
      {!searchText && !isBot && (
        <Suspense
          fallback={
            <div className="mb-2 h-16 w-full animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <GoogleLocationSelect from="home" />
        </Suspense>
      )}
      {!searchText && (
        <InfiniteScrollCarouselWrapper searchParams={searchParams} />
      )}
      {!searchText && (
        <Suspense fallback={<CampaignGridSuspense />}>
          {!searchText && isMobile ? <BannerCarousel /> : <HomePageGrid />}
        </Suspense>
      )}
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
