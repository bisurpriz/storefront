import InfinityScroll from "@/components/InfinityScroll";
import Filter from "@/components/Filter";
import { searchProducts } from "../actions";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params["category-slug"];

  const data = await searchProducts(
    {
      offset: 0,
      limit: 15,
    },
    {
      ...searchParams,
      category: slug,
    }
  );

  const { products, totalCount } = data;

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
        query={searchProducts}
        params={searchParams}
      />
    </>
  );
}
