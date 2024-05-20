import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import View1 from "@/components/Layout/GridViews/View1";
import { Suspense } from "react";
import { getBanners } from "./actions";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import { query } from "@/graphql/lib/client";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
} from "@/graphql/generated";

export default async function Page() {
  const { banners } = await getBanners();
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery>({
    query: GetAllCategoriesDocument,
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
      <CategorySwiper categories={category} />
      <CampaignGrid banners={banners} />
      <View1 />
    </Suspense>
  );
}
