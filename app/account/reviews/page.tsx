"use client";

import Tab from "@/components/Tab";
import NotReviewedCard from "./components/NotReviewed/NotReviewedCard";
import { createReview, getOrderWithReview } from "./actions";
import { OrderItemWithReview } from "@/common/types/Order/order";
import { useEffect, useState } from "react";

const mapper = (
  result: OrderItemWithReview[],
  onReviewSubmit: ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => Promise<void>
) =>
  result.map((item) => (
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

const ReviewsPage = () => {
  const [items, setItems] = useState<OrderItemWithReview[] | null>(null);

  const getNotReviewed = async () => {
    const response = await getOrderWithReview();
    setItems(response.order_item);
  };

  const handleCreateReview = async ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => {
    await createReview({ product_id, score, comment });
    getNotReviewed();
  };

  useEffect(() => {
    getNotReviewed();
  }, []);

  console.log(items, "items");

  return (
    <Tab
      tabs={[
        {
          content: mapper(items, handleCreateReview),
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
