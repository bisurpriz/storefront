import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import { FC } from "react";
import InfinityScroll from ".";

type ServerInfinityScrollProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  hasFilter?: boolean;
};

const ServerInfinityScroll: FC<ServerInfinityScrollProps> = async ({
  searchParams,
  hasFilter = false,
}) => {
  const response = await searchProductsv1(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    {
      ...searchParams,
    },
  );

  const data = response?.hits.map((hit) => hit.document);
  const totalCount = response?.found;

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={data}
      query={searchProductsv1}
      params={searchParams}
      hasFilter={hasFilter}
    />
  );
};

export default ServerInfinityScroll;
