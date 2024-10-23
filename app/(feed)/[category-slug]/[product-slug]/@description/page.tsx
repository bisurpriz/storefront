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

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductDescriptionPage: FC<Props> = async props => {
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

  return (
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
  );
};

export default ProductDescriptionPage;
