import { PageProps } from "@/.next/types/app/page";
import NewDesignGallery from "@/components/Product/DetailImageGallery/NewDesign";
import ProductSetter from "@/contexts/ProductContext/ProductSetter";
import { Product as ProductType } from "@/graphql/generated-types";
import { GetProductImagesQuery } from "@/graphql/queries/products/getProductById.generated";
import JsonLd from "@/lib/JsonLd";
import { getImageUrlFromPath } from "@/lib/utils";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductImagesDocument } from "@/service/product/images";
import { typesenseClient } from "@/typesense/client";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Product, WithContext } from "schema-dts";

const ProductImageCarouselPage: FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  if (!id) {
    console.error("Product ID not found");
    return notFound();
  }

  const { product } = await BonnmarseApi.request<GetProductImagesQuery>({
    query: GetProductImagesDocument,
    variables: {
      id,
    },
    tags: ["getProductImages"],
    withAuth: false,
  });

  if (!product) {
    notFound();
  }

  const fullProductData = await typesenseClient
    .collections("products")
    .documents(id.toString())
    .retrieve();

  const productData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    image: getImageUrlFromPath(product.image_url[0]),
  };

  return (
    <>
      <ProductSetter initialData={fullProductData as ProductType} />
      <NewDesignGallery images={product.image_url} />
      <JsonLd data={productData} />
    </>
  );
};

export default ProductImageCarouselPage;
