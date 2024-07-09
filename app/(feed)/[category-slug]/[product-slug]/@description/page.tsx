import AccordionItem from "@/components/Accordion/AccordionItem";
import React, { FC } from "react";
import ProductDescription from "../../components/Detail/ProductDescription";
import { parseJson } from "@/utils/format";
import {
  GetProductDescriptionDocument,
  GetProductDescriptionQuery,
  GetProductDescriptionQueryVariables,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";

type Props = {
  searchParams: {
    [key: string]: string | number;
  };
};

const ProductDescriptionPage: FC<Props> = async ({ searchParams }) => {
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

  const { description, properties } = product[0];

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
