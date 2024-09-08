import React, { FC } from "react";
import InfinityScroll from ".";
import { searchProducts } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";

type ServerInfinityScrollProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ServerInfinityScroll: FC<ServerInfinityScrollProps> = async ({
  searchParams,
}) => {
  const data = await searchProducts(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    searchParams
  );

  return (
    <InfinityScroll
      totalCount={data?.totalCount}
      initialData={data?.products}
      dataKey="products"
      query={searchProducts}
      params={searchParams}
    />
  );
};

export default ServerInfinityScroll;
