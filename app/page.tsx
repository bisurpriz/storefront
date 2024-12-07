import Filter from "@/components/Filter";
import FilterSuspense from "@/components/Filter/FilterSuspense";
import { BannerCarousel } from "@/components/Grids/CampaignGrid/CampaignGrid";
import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import HomePageGrid from "@/components/Grids/CampaignGrid/HomePageGrid";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import GoogleLocationSelect from "@/components/QuarterSelector/GoogleLocationSelect";
import FeaturedProducts from "@/components/Sections/FeaturedProductSection/FeaturedProductSection";
import FeaturedProductSectionSkeleton from "@/components/Sections/FeaturedProductSection/FeaturedProductSectionSkeleton";
import CategorySwiperSuspense from "@/components/SwiperExamples/CategorySwiper/CategorySwiperSuspense";
import ServerCategorySwiper from "@/components/SwiperExamples/CategorySwiper/ServerCategorySwiper";
import { GetAllCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { GetCategoriesDocument } from "@/service/category";
import { BonnmarseApi } from "@/service/fetch";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Suspense } from "react";
import BlogPostSection from "./blog/components/BlogPostSection";
import BlogPostSectionSuspense from "./blog/components/BlogPostSectionSuspense";

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

  return (
    <div className="flex flex-col gap-4">
      {searchText && (
        <Suspense fallback={<FilterSuspense />}>
          <Filter filterTypes={["price", "sameDayDelivery", "customizable"]} />
        </Suspense>
      )}
      {!searchText && !(category.length < 8 && !isMobile) && (
        <Suspense fallback={<CategorySwiperSuspense />}>
          <ServerCategorySwiper category={category} />
        </Suspense>
      )}
      {!searchText && (
        <Suspense
          fallback={
            <div className="mb-2 h-16 w-full animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <GoogleLocationSelect from="home" />
        </Suspense>
      )}
      <Suspense fallback={<CampaignGridSuspense />}>
        {!searchText && isMobile ? <BannerCarousel /> : <HomePageGrid />}
      </Suspense>

      {/* {category.length < 8 && viewport === "desktop" && (
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection category={category} />
        </Suspense>
      )} */}

      <Suspense fallback={<FeaturedProductSectionSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<BlogPostSectionSuspense />}>
        <BlogPostSection />
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
