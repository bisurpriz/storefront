import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import View1 from "@/components/Layout/GridViews/View1";
import { Suspense } from "react";
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

export default async function Page() {
  const { banners } = await getBanners();
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery>({
    query: GetAllCategoriesDocument,
  });

  const location = await getLocationFromCookie();

  const data = await getAvailableLocation(location);

  const value = data?.value;

  return (
    <Suspense
      fallback={
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 my-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-48 bg-gray-400 rounded-md shadow-md m-2 animate-pulse"
            />
          ))}
        </div>
      }
    >
      <CategorySwiper categories={category} />
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
      <CampaignGrid banners={banners} />
      <View1 />
    </Suspense>
  );
}
