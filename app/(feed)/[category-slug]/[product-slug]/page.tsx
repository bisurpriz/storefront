import { IMAGE_URL } from "@/contants/urls";
import ProductImageCarousel from "../components/Detail/ProductImageCarousel";
import { query } from "@/graphql/lib/client";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/generated";
import { FC } from "react";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductImageCarouselPage: FC<Props> = async ({ searchParams }) => {
  const id = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await query<GetProductImagesQuery, GetProductImagesQueryVariables>({
    query: GetProductImagesDocument,
    variables: {
      id,
    },
  });

  return (
    <ProductImageCarousel
      images={product[0].image_url?.map((url: string, index) => ({
        id: index,
        url: `${IMAGE_URL}/${url}` as string,
      }))}
    />
  );
};

export default ProductImageCarouselPage;
