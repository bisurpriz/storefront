import CampaignGrid from "@/components/Grids/CampaignGrid/CampaignGrid";
import BrandSwiper from "@/components/SwiperExamples/BrandSwiper";
import CategorySwiper from "@/components/SwiperExamples/CategorySwiper";
import React from "react";

export default function Page() {
  // grid will be
  // ----- -----
  // --- --- ---
  // ----- -----

  return (
    <div>
      <BrandSwiper />
      <CategorySwiper />
      <CampaignGrid />
    </div>
  );
}
