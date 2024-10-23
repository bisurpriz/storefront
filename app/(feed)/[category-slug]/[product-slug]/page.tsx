import { query } from "@/graphql/lib/client";

import { FC } from "react";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import { redirect } from "next/navigation";
import ProductDetailImageGallery from "@/components/Product/DetailImageGallery";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductImageCarouselPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  if (!id) {
    return redirect("/");
  }

  const { data } = await query<
    GetProductImagesQuery,
    GetProductImagesQueryVariables
  >({
    query: GetProductImagesDocument,
    variables: {
      id,
    },
  });

  if (!data?.product) {
    redirect("/");
  }

  return <ProductDetailImageGallery images={data?.product.image_url} />;
};

export default ProductImageCarouselPage;
