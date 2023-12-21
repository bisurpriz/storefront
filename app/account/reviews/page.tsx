import Tab from "@/components/Tab";
import { getOrderWithReview } from "./actions";
import NotReviewedCardMapper from "./components/NotReviewed/CardMapper";

const ReviewsPage = async () => {
  const { order_item } = await getOrderWithReview();

  // const handleCreateReview = async ({
  //   product_id,
  //   score,
  //   comment,
  // }: {
  //   product_id: number;
  //   score: number;
  //   comment: string;
  // }) => {
  //   await createReview({ product_id, score, comment });
  //   getNotReviewed();
  // };

  return (
    <Tab
      tabs={[
        {
          content: <NotReviewedCardMapper result={order_item} />,
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
