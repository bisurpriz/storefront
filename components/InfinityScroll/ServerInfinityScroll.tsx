import React, { FC } from "react";
import InfinityScroll from ".";
import { searchProducts } from "@/app/(feed)/actions";

type ServerInfinityScrollProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ServerInfinityScroll: FC<ServerInfinityScrollProps> = async ({
  searchParams,
}) => {
  const { products, totalCount } = await searchProducts(
    {
      offset: 0,
      limit: 15,
    },
    searchParams
  );

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={products}
      dataKey="products"
      query={searchProducts}
      params={searchParams}
    />
  );
};

export default ServerInfinityScroll;
