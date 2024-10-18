import { getOrderWithReview } from "./actions";
import { Suspense } from "react";
import ProductReviewsTab from "./components/ReviewsTab";

const ReviewsPage = async () => {
  const { order_item, reviews } = await getOrderWithReview();
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4">
          <div className="w-full flex flex-col gap-4">
            <div className="h-8 bg-gray-200 animate-pulse w-full rounded-lg" />
            <div className="flex gap-4 bg-gray-100 rounded-lg animate-pulse p-4">
              <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg" />
              <div className="flex-grow space-y-4">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProductReviewsTab orders={order_item} reviews={reviews} />
    </Suspense>
  );
};

export default ReviewsPage;
