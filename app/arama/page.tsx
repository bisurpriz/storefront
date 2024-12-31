import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import Filters from "@/app/magaza/components/Filters";
import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const searchQuery = params?.search;

  return {
    title: searchQuery
      ? `${searchQuery} için arama sonuçları - Bonnmarşe`
      : "Arama - Bonnmarşe",
    description: searchQuery
      ? `${searchQuery} için arama sonuçlarını görüntüleyin. En iyi fiyatlar ve hızlı teslimat seçenekleriyle Bonnmarşe'de alışveriş yapın.`
      : "Bonnmarşe'de aradığınız ürünleri bulun. En iyi fiyatlar ve hızlı teslimat seçenekleriyle güvenli alışveriş.",
    keywords: searchQuery
      ? `${searchQuery}, arama sonuçları, online alışveriş, ücretsiz kargo`
      : "arama, online alışveriş, ücretsiz kargo, güvenli alışveriş",
  };
}

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search;

  if (!searchQuery) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-center text-lg text-muted-foreground">
          Arama yapmak için bir şeyler yazın
        </p>
      </div>
    );
  }

  const response = await searchProductsv1(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    searchParams,
  );

  const data = response?.hits.map((hit) => hit.document);
  const totalCount = response?.found;

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-lg font-medium">
            &quot;{searchQuery}&quot; için arama sonuçları
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} ürün bulundu
          </p>
        </div>
      </div>

      {/* Mobil Filtre */}
      <div className="lg:hidden">
        <Filters filterTypes={["price", "sameDayDelivery", "customizable"]} />
      </div>

      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        {/* Desktop Filtre */}
        <div className="hidden lg:col-span-1 lg:block">
          <Filters
            filterTypes={["price", "sameDayDelivery", "customizable"]}
            className="sticky top-6"
          />
        </div>

        {/* Ürün Listesi */}
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          <InfinityScroll
            totalCount={totalCount}
            initialData={data}
            query={searchProductsv1}
            params={searchParams}
          />
        </div>
      </div>
    </div>
  );
}
