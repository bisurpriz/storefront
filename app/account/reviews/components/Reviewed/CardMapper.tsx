"use client";
import { ReviewWithProduct } from "@/common/types/Review/review";
import ReviewedCard from "./ReviewedCard";

const ReviewedCardMapper = ({ result }: { result: ReviewWithProduct[] }) =>
  result?.map((item) => (
    <ReviewedCard
      key={item.id}
      comment={item.comment}
      productName={item.product.name}
      reviewDate={item.created_at}
      imageUrl={item.product.image_url[0]}
      rating={item.score}
      reviewCount={item.product.review_count}
      productId={item.product.id}
    />
  ));

export default ReviewedCardMapper;
