import Tab from "@/components/Tab";
import { getOrderWithReview } from "./actions";
import NotReviewedCardMapper from "./components/NotReviewed/CardMapper";
import ReviewedCardMapper from "./components/Reviewed/CardMapper";
import { Suspense } from "react";

const ReviewsPage = async () => {
  const { order_item, reviews } = await getOrderWithReview();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <Tab
        tabs={[
          {
            content: <NotReviewedCardMapper result={order_item} />,
            id: "not-reviewed",
            label: "Değerlendirme yapılmayanlar",
          },
          {
            content: <ReviewedCardMapper result={reviews} />,
            id: "reviewed",
            label: "Değerlendirilenler",
          },
        ]}
      />
    </Suspense>
  );
};

export default ReviewsPage;
