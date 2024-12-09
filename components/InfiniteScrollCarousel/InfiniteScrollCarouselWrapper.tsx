import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import { Product } from "@/graphql/generated-types";
import InfiniteProductCarousel from ".";

export default async function InfiniteScrollCarouselWrapper({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const response = await searchProductsv1(
    {
      offset: 0,
      limit: PER_REQUEST,
    },
    {
      ...params,
    },
  );

  return (
    <InfiniteProductCarousel
      initialProducts={response?.hits?.map((p) => p.document) as Product[]}
      fetchMoreProducts={searchProductsv1}
      params={params}
      totalCount={response?.found!}
    />
  );
}
