import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import View1 from "@/components/Layout/GridViews/View1";
import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";

export default async function Page() {
  return (
    <div>
      <CategorySwiper />
      <CampaignGrid />
      <View1 />
    </div>
  );
}
