import { PageProps } from "@/.next/types/app/page";
import { GetProductCommentsQuery } from "@/graphql/queries/products/getProductById.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductCommentsDocument } from "@/service/product/comments";
import { FC } from "react";
import { Review, WithContext } from "schema-dts";
import ProductComments from "../../components/Detail/ProductComments";
import ProductCommentsLoadingPage from "./loading";

const ProductCommentsPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  const { product } = await BonnmarseApi.request<GetProductCommentsQuery>({
    query: GetProductCommentsDocument,
    variables: {
      id,
    },
  });

  if (!product) {
    return <ProductCommentsLoadingPage />;
  }

  const maskName = (name: string) => {
    return name.charAt(0) + "*".repeat(name.length - 1);
  };

  const reviewData: WithContext<Review>[] = product?.reviews?.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: review.comment,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.score,
      bestRating: 5,
    },
    datePublished: review.created_at,
    author: {
      "@type": "Person",
      name: `${maskName(review.user.firstname)} ${maskName(
        review.user.lastname,
      )}`,
    },
  }));

  return (
    <>
      <ProductComments
        comments={product.reviews.map((rw, index) => ({
          comment: rw.comment,
          createdAt: rw.created_at,
          firstName: rw.user.firstname.slice(0, 1) + "***",
          lastName: rw.user.lastname.slice(0, 1) + "***",
          user_id: 0,
          rate: rw.score,
          user_image_url: rw.user.picture || "https://via.placeholder.com/150",
          comment_id: rw.id,
        }))}
      />
      {product.reviews && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewData) }}
        />
      )}
    </>
  );
};

export default ProductCommentsPage;
