import { query } from "@/graphql/lib/client";

import { FC } from "react";
import ProductDetailImageGallery from "@/components/Product/DetailImageGallery";
import { ImageZoomModalProvider } from "@/contexts/ImageZoomModalContext";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";

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
    <ImageZoomModalProvider>
      <ProductDetailImageGallery images={product.image_url} />
    </ImageZoomModalProvider>
  );
};

export default ProductImageCarouselPage;
