import ReviewedCard from "./ReviewedCard";
import { GetOrdersWithReviewsQuery } from "@/graphql/generated";

const ReviewedCardMapper = ({
  result,
}: {
  result: GetOrdersWithReviewsQuery["review"];
}) =>
  result?.map((item) => (
    <ReviewedCard
      key={item.id}
      comment={item.comment}
      productName={item.product.name}
      reviewDate={item.created_at}
      imageUrl={item.product.image_url?.[0]}
      rating={item.score}
      reviewCount={item.product.reviews_aggregate.aggregate.count}
      productId={item.product.id}
    />
  ));

export default ReviewedCardMapper;
