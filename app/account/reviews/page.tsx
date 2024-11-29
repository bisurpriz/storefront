import { getOrderWithReview } from "./actions";
import { Suspense } from "react";
import ProductReviewsTab from "./components/ReviewsTab";

const ReviewsPage = async () => {
  const { order_item, reviews } = await getOrderWithReview();
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4">
          <div className="flex w-full flex-col gap-4">
            <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="flex animate-pulse gap-4 rounded-lg bg-gray-100 p-4">
              <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
              <div className="flex-grow space-y-4">
                <div className="h-4 w-36 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
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
