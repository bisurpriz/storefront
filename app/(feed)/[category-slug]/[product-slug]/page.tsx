import { IMAGE_URL } from "@/contants/urls";
import { query } from "@/graphql/lib/client";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/generated";
import { FC } from "react";
import ProductDetailImageGallery from "@/components/Product/DetailImageGallery";
import { ImageZoomModalProvider } from "@/contexts/ImageZoomModalContext";

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
      <ProductDetailImageGallery
        images={product.image_url.map((image) => `${IMAGE_URL}/${image}`)}
      />
    </ImageZoomModalProvider>
  );
};

export default ProductImageCarouselPage;
