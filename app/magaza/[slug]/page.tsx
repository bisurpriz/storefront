import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import Filter from "@/components/Filter";
import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
import { getVendorDetails } from "../actions";
import TenantHeader from "../components/TenantHeader";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Mağaza`;
  const description = `Mağaza Ürünleri`;

  return {
    title,
    description,
  };
}

const Vendor = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug } = params;

  const vendorId = searchParams["mid"];

  // promise all
  // getVendorDetails
  const responses = await Promise.all([
    searchProductsv1(
      {
        offset: 0,
        limit: PER_REQUEST,
      },
      {
        ...searchParams,
        tenant: vendorId,
      },
    ),
    getVendorDetails({
      id: vendorId,
    }),
  ]);

  const data = responses?.[0]?.hits.map((hit) => hit.document);
  const totalCount = responses?.[0]?.found;
  const tenantDetails = responses[1];

  return (
    <>
      <TenantHeader
        title={tenantDetails.legal_company_title || tenantDetails.name}
        joinedDate={tenantDetails.created_at}
        logoUrl={tenantDetails.logo}
        id={tenantDetails.id}
        productsCount={tenantDetails.owner.products_aggregate.aggregate.count}
        reviewsCount={tenantDetails.owner.reviews_aggregate.aggregate.count}
      />
      <Filter filterTypes={["price", "sameDayDelivery", "customizable"]} />

      <InfinityScroll
        totalCount={totalCount}
        initialData={data}
        query={searchProductsv1}
        params={{
          ...searchParams,
          tenant: vendorId,
        }}
      />
    </>
  );
};

export default Vendor;
