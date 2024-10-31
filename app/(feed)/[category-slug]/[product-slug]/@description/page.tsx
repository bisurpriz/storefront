import AccordionItem from "@/components/Accordion/AccordionItem";
import React, { FC } from "react";
import ProductDescription from "../../components/Detail/ProductDescription";
import { parseJson } from "@/utils/format";

import { query } from "@/graphql/lib/client";
import {
  GetProductDescriptionDocument,
  GetProductDescriptionQuery,
  GetProductDescriptionQueryVariables,
} from "@/graphql/queries/products/getProductById.generated";
import ProductDescriptionLoadingPage from "./loading";
import { Product, WithContext } from "schema-dts";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductDescriptionPage: FC<Props> = async (props) => {
  const searchParams = await props.searchParams;
  const id = Number(searchParams["pid"]);

  const {
    data: { product },
  } = await query<
    GetProductDescriptionQuery,
    GetProductDescriptionQueryVariables
  >({
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
    additionalProperty: parseJson(product.properties).map(
      (prop: { name: string; value: string }) => ({
        "@type": "PropertyValue",
        name: prop.name,
        value: prop.value,
      })
    ),
  };

  return (
    <>
      <AccordionItem
        content={
          <ProductDescription
            description={description}
            notes={[]}
            specifications={parseJson(properties)}
          />
        }
        title="Ürün Detayları"
        bordered
        isOpen
        className="rounded-lg"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
    </>
  );
};

export default ProductDescriptionPage;
