import { PER_REQUEST } from "@/app/constants";
import Filter from "@/components/Filter";
import InfinityScroll from "@/components/InfinityScroll";
import { searchProductsv1 } from "../actions";

export async function generateMetadata({ params }) {
  const category = params["category-slug"];
  return {
    title: `Bonnmarşe - ${category} Kategorisinin En İyi Ürünleri`,
    description: `Bonnmarşe'de ${category} kategorisindeki en iyi ürünleri keşfedin. Ücretsiz kargo, gün için teslimat ve iade fırsatıyla hemen satın alın.`,
    keywords: `${category}, en iyi ürünler, ücretsiz kargo, gün içi teslimat, iade fırsatı`,
    robots: "index, follow",
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params["category-slug"];

  const response = await searchProductsv1(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    {
      ...searchParams,
      category: slug,
    },
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
