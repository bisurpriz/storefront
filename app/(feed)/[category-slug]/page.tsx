import InfinityScroll from "@/components/InfinityScroll";
import { getPaginatedProducts } from "../../products/actions";
import Filter from "@/components/Filter";
import { createDynamicQueryMapper } from "@/utils/createDynamicQueryMapper";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params["category-slug"];
  console.log(JSON.stringify(createDynamicQueryMapper(searchParams)));
  const { products, totalCount } = await getPaginatedProducts({
    offset: 0,
    category_slug: slug,
  });

  return (
    <>
      <Filter />
      <InfinityScroll
        totalCount={totalCount}
        initialData={products}
        dataKey="products"
        query={getPaginatedProducts}
      />
    </>
  );
}
