import { query } from "@/graphql/lib/client";

import { FC } from "react";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import dynamic from "next/dynamic";
import ProductImageGalleryLoading from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const DynamicGallery = dynamic(
  () => import("@/components/Product/DetailImageGallery"),
  {
    ssr: false,
    loading: () => <ProductImageGalleryLoading />,
  }
);

const ProductImageCarouselPage: FC<Props> = async ({ searchParams }) => {
  const id = Number(searchParams["pid"]);

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

  return <DynamicGallery images={data?.product.image_url} />;
};

export default ProductImageCarouselPage;
