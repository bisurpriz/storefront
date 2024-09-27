import InfinityScroll from "@/components/InfinityScroll";
import Filter from "@/components/Filter";
import { searchProductsv1 } from "../actions";
import { PER_REQUEST } from "@/app/constants";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params["category-slug"];

  const response = await searchProductsv1(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    {
      ...searchParams,
      category: slug,
    }
  );

  const data = response?.hits.map((hit) => hit.document);
  const totalCount = response?.found;

  return (
    <>
      <Filter filterTypes={["price", "sameDayDelivery", "customizable"]} />
      <InfinityScroll
        totalCount={totalCount}
        initialData={data}
        dataKey="products"
        query={searchProductsv1}
        params={searchParams}
      />
    </>
  );
}
