import Tab from "@/components/Tab";
import React from "react";
import NotReviewedCard from "./components/NotReviewed/NotReviewedCard";

const ReviewsPage = async () => {
  return (
    <Tab
      tabs={[
        {
          content: <NotReviewedCard />,
          id: "not-reviewed",
          label: "Değerlendirme yapılmayanlar",
        },
        {
          content: <div>Değerlendirilenler</div>,
          id: "reviewed",
          label: "Değerlendirilenler",
        },
      ]}
      activeTab="not-reviewed"
    />
  );
};

export default ReviewsPage;
