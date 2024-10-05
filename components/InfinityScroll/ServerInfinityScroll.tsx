import React, { FC } from "react";
import InfinityScroll from ".";
import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";

type ServerInfinityScrollProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ServerInfinityScroll: FC<ServerInfinityScrollProps> = async ({
  searchParams,
}) => {
  const response = await searchProductsv1({
    offset: 0,
    limit: PER_REQUEST,
  });

  const data = response?.hits.map((hit) => hit.document);
  const totalCount = response?.found;

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={data}
      dataKey="products"
      query={searchProductsv1}
      params={searchParams}
    />
  );
};

export default ServerInfinityScroll;
