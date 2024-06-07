import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import View1 from "@/components/Layout/GridViews/View1";
import { Suspense } from "react";
import {
  getBanners,
  getCityById,
  getDistrictById,
  getLocationFromCookie,
  getQuarterById,
} from "./actions";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import { query } from "@/graphql/lib/client";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
} from "@/graphql/generated";
import QuarterSelector from "@/components/QuarterSelector";
import LandingSearchBanner from "@/components/LandingSearchBanner";
import clsx from "clsx";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";

export default async function Page() {
  const { banners } = await getBanners();
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery>({
    query: GetAllCategoriesDocument,
  });

  const location = await getLocationFromCookie();

  const getAvailableLocation = async () => {
    if (!location) return null;
    const { type, id } = location;

    switch (type) {
      case "city": {
        const data = await getCityById({
          id: id,
        });
        return createQuarterSelectorLabel({
          city_name: data.city[0].name,
          city_id: data.city[0].id,
          type: "city",
        });
      }
      case "district": {
        const data = await getDistrictById({
          id: id,
        });
        return createQuarterSelectorLabel({
          district_name: data.district[0].name,
          district_id: data.district[0].id,
          city_name: data.district[0].city.name,
          city_id: data.district[0].city.id,
          type: "district",
        });
      }
      case "quarter": {
        const data = await getQuarterById({
          id: id,
        });
        return createQuarterSelectorLabel({
          name: data.quarter[0].name,
          id: data.quarter[0].id,
          district_name: data.quarter[0].district.name,
          district_id: data.quarter[0].district.id,
          city_name: data.quarter[0].district.city.name,
          city_id: data.quarter[0].district.city.id,
          type: "quarter",
        });
      }
      default:
        return null;
    }
  };

  const value = await getAvailableLocation();

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
      <div
        className={clsx(
          "grid grid-cols-12 gap-4 w-full mb-4",
          "bg-white p-4 rounded-md border border-gray-100"
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
      <CategorySwiper categories={category} />
      <CampaignGrid banners={banners} />
      <View1 />
    </Suspense>
  );
}
