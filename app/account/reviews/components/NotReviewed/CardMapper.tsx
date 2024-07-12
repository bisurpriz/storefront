import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import NotReviewedCard from "./NotReviewedCard";

const NotReviewedCardMapper = ({
  result,
}: {
  result: GetOrdersWithReviewsQuery["order_item"];
}) =>
  result.length > 0 ? (
    result?.map((item) => (
      <NotReviewedCard
        key={item.id}
        productName={item.product.name}
        deliveryDate={item.created_at}
        imageUrl={item.product.image_url?.[0]}
        rating={3}
        reviewCount={item.product.reviews_aggregate.aggregate.count}
        productId={item.product.id}
      />
    ))
  ) : (
    <div className="flex items-center justify-center w-full h-full p-4 ">
      <p className="text-lg font-semibold text-slate-700 font-mono">
        Değerlendirme yapılacak ürün bulunamadı.
      </p>
    </div>
  );

export default NotReviewedCardMapper;
