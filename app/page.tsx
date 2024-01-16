import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import View1 from "@/components/Layout/GridViews/View1";
import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import { getBanners } from "./actions";

export default async function Page() {
  const { banners } = await getBanners();
  return (
    <div>
      <CategorySwiper />
      <CampaignGrid banners={banners}/>
      <View1 />
    </div>
  );
}
