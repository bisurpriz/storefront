import { FC } from "react";
import ProductComments from "../../components/Detail/ProductComments";
import { query } from "@/graphql/lib/client";
import {
  GetProductCommentsDocument,
  GetProductCommentsQuery,
  GetProductCommentsQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import ProductCommentsLoadingPage from "./loading";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductCommentsPage: FC<Props> = async ({ searchParams }) => {
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

  return (
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
  );
};

export default ProductCommentsPage;
