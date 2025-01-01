import { parseJson } from "@/utils/format";
import { FC } from "react";
import ProductDescription from "../../components/Detail/ProductDescription";

import { GetProductDescriptionQuery } from "@/graphql/queries/products/getProductById.generated";
import JsonLd from "@/lib/JsonLd";
import { BonnmarseApi } from "@/service/fetch";
import { GetProductDescriptionDocument } from "@/service/product";
import { Product, WithContext } from "schema-dts";
import ProductDescriptionLoadingPage from "./loading";

const ProductDescriptionPage: FC<{
  searchParams: { [key: string]: string | string[] | undefined };
}> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  const { product } = await BonnmarseApi.request<GetProductDescriptionQuery>({
    query: GetProductDescriptionDocument,
    variables: {
      id,
    },
  });

  if (!product) {
    return <ProductDescriptionLoadingPage />;
  }

  const { description, properties } = product;

  const productData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    description: product.description?.replace(/<[^>]*>/g, ""),
    additionalProperty: parseJson(product?.properties)?.map(
      (prop: { name: string; value: string }) => ({
        "@type": "PropertyValue",
        name: prop.name,
        value: prop.value,
      }),
    ),
  };

  return (
    <>
      <ProductDescription
        description={description}
        notes={[]}
        specifications={parseJson(properties)}
      />

      <JsonLd data={productData} />
    </>
  );
};

export default ProductDescriptionPage;
