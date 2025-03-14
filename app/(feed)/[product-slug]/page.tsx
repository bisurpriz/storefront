import { ProductCarousel } from "@/components/Product/DetailImageGallery/NewDesign";
import ProductSetter from "@/contexts/ProductContext/ProductSetter";
import { Product as ProductType } from "@/graphql/generated-types";
import { GetProductImagesQuery } from "@/graphql/queries/products/getProductById.generated";
import JsonLd from "@/lib/JsonLd";
import { getImageUrlFromPath } from "@/lib/utils";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductImagesDocument } from "@/service/product/images";
import { typesenseClient } from "@/typesense/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { userAgent } from "next/server";
import { FC } from "react";
import { Product, WithContext } from "schema-dts";
const ProductImageCarouselPage: FC<{
  searchParams: Promise<{ pid: string }>;
}> = async ({ searchParams }) => {
  const { pid } = await searchParams;
  const id = Number(pid);

  if (!id) {
    console.error("Product ID not found");
    return null;
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

  const { device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <>
      <ProductSetter initialData={fullProductData as ProductType} />
      <ProductCarousel images={product.image_url} />
      <JsonLd data={productData} />
    </>
  );
};

export default ProductImageCarouselPage;
