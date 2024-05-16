import InfinityScroll from "@/components/InfinityScroll";
import { getPaginatedProducts } from "../../products/actions";
import Filter from "@/components/Filter";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params["category-slug"];

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
