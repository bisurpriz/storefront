"use client";
import { OrderItemWithReview } from "@/common/types/Order/order";
import NotReviewedCard from "./NotReviewedCard";

const NotReviewedCardMapper = ({
  result,
  onReviewSubmit,
}: {
  result: OrderItemWithReview[];
  onReviewSubmit?: ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => Promise<void>;
}) =>
  result?.map((item) => (
    <NotReviewedCard
      key={item.id}
      productName={item.product.name}
      deliveryDate={item.created_at}
      imageUrl={item.product.image_url[0]}
      rating={3}
      reviewCount={item.review_count}
      productId={item.product.id}
      onReviewSubmit={onReviewSubmit}
    />
  ));

export default NotReviewedCardMapper;
