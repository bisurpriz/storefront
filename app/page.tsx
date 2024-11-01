import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import Filter from "@/components/Filter";
import FilterSuspense from "@/components/Filter/FilterSuspense";
import { Suspense } from "react";
import CategorySwiperSuspense from "@/components/SwiperExamples/CategorySwiper/CategorySwiperSuspense";
import CampaignGridSuspense from "@/components/Grids/CampaignGrid/CampaignGridSuspense";
import ProductItemSkeleton from "@/components/Product/Item/ProductItemSkeleton";
import ServerCategorySwiper from "@/components/SwiperExamples/CategorySwiper/ServerCategorySwiper";
import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";
import { query } from "@/graphql/lib/client";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
} from "@/graphql/queries/categories/getCategories.generated";
import GoogleLocationSelect from "@/components/QuarterSelector/GoogleLocationSelect";

export const experimental_ppr = true;

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const searchText = searchParams.hasOwnProperty("search");

  const viewport = await getServerSideViewPort();

  const {
    data: { category },
  } = await query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
    query: GetAllCategoriesDocument,
    fetchPolicy: "cache-first",
  });

  return (
    <div className="flex flex-col gap-4">
      {searchText && (
        <Suspense fallback={<FilterSuspense />}>
          <Filter filterTypes={["price", "sameDayDelivery", "customizable"]} />
        </Suspense>
      )}
      {!searchText && !(category.length < 8 && viewport === "desktop") && (
        <Suspense fallback={<CategorySwiperSuspense />}>
          <ServerCategorySwiper category={category} />
        </Suspense>
      )}
      {!searchText && (
        <Suspense
          fallback={
            <div className="w-full h-16 bg-gray-100 animate-pulse rounded-lg mb-2" />
          }
        >
          <GoogleLocationSelect from="home" />
        </Suspense>
      )}
      <Suspense fallback={<CampaignGridSuspense />}>
        {!searchText && <CampaignGrid />}
      </Suspense>

      {/* {category.length < 8 && viewport === "desktop" && (
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection category={category} />
        </Suspense>
      )} */}

      {/* <Suspense fallback={<FeaturedProductSectionSkeleton />}>
        <FeaturedProducts
          products={Array.from({
            length: 25,
          }).map((_, i) => ({
            id: i,
            imageSrc: "https://via.placeholder.com/300",
            name: "Product Name",
            badge: "Yeni",
            price: 100,
            discountPrice: 80,
            href: "/",
          }))}
        />
      </Suspense> */}

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
    </div>
  );
}
