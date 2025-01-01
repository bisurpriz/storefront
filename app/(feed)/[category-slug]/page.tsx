import { PER_REQUEST } from "@/app/constants";
import Filters from "@/app/magaza/components/Filters";
import InfinityScroll from "@/components/InfinityScroll";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { searchProductsv1 } from "../actions";

export async function generateMetadata({ params }) {
  const param = await params;
  const category = param["category-slug"];

  if (!category) return;

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

  if (!slug) return;

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

  const { device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
      <div className="lg:col-span-1">
        <Filters
          filterTypes={["price", "sameDayDelivery", "customizable"]}
          isMobile={isMobile}
        />
      </div>
      <div className="lg:col-span-4">
        <InfinityScroll
          totalCount={totalCount}
          initialData={data}
          query={searchProductsv1}
          params={{
            ...searchParams,
            category: slug,
          }}
        />
      </div>
    </div>
  );
}
