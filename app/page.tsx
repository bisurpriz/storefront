import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import View1 from "@/components/Layout/GridViews/View1";
import { Suspense } from "react";
import { getBanners } from "./actions";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import { query } from "@/graphql/lib/client";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetQuarterByIdDocument,
  GetQuarterByIdQuery,
  GetQuarterByIdQueryVariables,
} from "@/graphql/generated";
import QuarterSelector from "@/components/QuarterSelector";
import LandingSearchBanner from "@/components/LandingSearchBanner";
import clsx from "clsx";
import { cookies } from "next/headers";
import { createQuarterSelectorLabel } from "@/utils/createQuarterSelectorLabel";

export default async function Page() {
  const { banners } = await getBanners();
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery>({
    query: GetAllCategoriesDocument,
  });

  const quarterId = await cookies().get("selectedLocation")?.value;

  const { data } = await query<
    GetQuarterByIdQuery,
    GetQuarterByIdQueryVariables
  >({
    query: GetQuarterByIdDocument,
    variables: {
      id: quarterId && Number(quarterId),
    },
    fetchPolicy: "no-cache",
  });

  const value = createQuarterSelectorLabel({
    id: data.quarter_by_pk?.id,
    city_name: data.quarter_by_pk?.district.city.name,
    name: data.quarter_by_pk?.name,
    district_name: data.quarter_by_pk?.district.name,
  });

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
      <div className="grid grid-cols-12 gap-4 w-full mb-4">
        <div className={clsx("col-span-full text-left")}>
          <span className={clsx("text-xs font-normal text-pink-400")}>
            Sizin için en uygun ürünleri listelemek için lokasyonunuzu belirtin
          </span>
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
