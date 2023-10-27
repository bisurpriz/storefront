import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import BrandSwiper from "@/components/SwiperExamples/BrandSwiper";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import View1 from "@/components/Layout/GridViews/View1";

export default async function Page() {
  return (
    <div>
      <CategorySwiper />
      <BrandSwiper />
      <View1 />
    </div>
  );
}
