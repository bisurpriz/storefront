import { FC } from "react";
import ProductComments from "../../components/Detail/ProductComments";
import { query } from "@/graphql/lib/client";
import {
  GetProductCommentsDocument,
  GetProductCommentsQuery,
  GetProductCommentsQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import ProductCommentsLoadingPage from "./loading";
import { Review, WithContext } from "schema-dts";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductCommentsPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await query<GetProductCommentsQuery, GetProductCommentsQueryVariables>({
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
        review.user.lastname
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
          user_image_url: "https://picsum.photos/200/300",
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
