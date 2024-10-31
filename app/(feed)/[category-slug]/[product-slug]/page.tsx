import { query } from "@/graphql/lib/client";

import { FC } from "react";
import {
  GetProductImagesDocument,
  GetProductImagesQuery,
  GetProductImagesQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import { redirect } from "next/navigation";
import NewDesignGallery from "@/components/Product/DetailImageGallery/NewDesign";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";
import { WithContext, Product } from "schema-dts";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

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

  const viewport = await getServerSideViewPort();

  const productData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    image: getImageUrlFromPath(data.product.image_url[0]),
  };

  return (
    <>
      <NewDesignGallery
        images={data.product.image_url}
        isMobile={viewport !== "desktop"}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
    </>
  );
};

export default ProductImageCarouselPage;
