import InfinityScroll from "@/components/InfinityScroll";
import Filter from "@/components/Filter";
import { createDynamicQueryMapper } from "@/utils/createDynamicQueryMapper";
import { query } from "@/graphql/lib/client";
import {
  GetProductsWithFilteredPaginationDocument,
  GetProductsWithFilteredPaginationQuery,
} from "@/graphql/generated";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryMapper = createDynamicQueryMapper(searchParams);
  const slug = params["category-slug"];

  const data = await query<GetProductsWithFilteredPaginationQuery>({
    query: GetProductsWithFilteredPaginationDocument,
    variables: {
      slug,
      ...queryMapper,
    },
  });

  const {
    data: {
      product: products,
      product_aggregate: {
        aggregate: { count: totalCount },
      },
    },
  } = data;

  return (
    <>
      <Filter
        filterTypes={[
          "price",
          "sameDayDelivery",
          "specialOffers",
          "customizable",
        ]}
      />
      <InfinityScroll
        totalCount={totalCount}
        initialData={products}
        dataKey="products"
        query={data}
      />
    </>
  );
}
