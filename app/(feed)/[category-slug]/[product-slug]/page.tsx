import { PageProps } from "@/.next/types/app/page";
import NewDesignGallery from "@/components/Product/DetailImageGallery/NewDesign";
import { GetProductImagesQuery } from "@/graphql/queries/products/getProductById.generated";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductImagesDocument } from "@/service/product/images";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";
import { redirect } from "next/navigation";
import { FC } from "react";
import { Product, WithContext } from "schema-dts";

const ProductImageCarouselPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  if (!id) {
    return redirect("/");
  }

  const { product } = await BonnmarseApi.request<GetProductImagesQuery>({
    query: GetProductImagesDocument,
    variables: {
      id,
    },
  });

  if (!product) {
    redirect("/");
  }

  const viewport = await getServerSideViewPort();

  const productData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    image: getImageUrlFromPath(product.image_url[0]),
  };

  return (
    <>
      <NewDesignGallery
        images={product.image_url}
        isMobile={viewport === "mobile"}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
    </>
  );
};

export default ProductImageCarouselPage;
