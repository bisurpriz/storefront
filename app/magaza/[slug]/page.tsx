import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
import Filter from "@/components/Filter";
import { searchProducts } from "@/app/(feed)/actions";
import TenantHeader from "../components/TenantHeader";
import { getVendorDetails } from "../actions";

type Props = {
  products: any;
  totalCount: number;
};

export async function generateMetadata(): Promise<Metadata> {
  const title = `Mağaza`;
  const description = `Mağaza Ürünleri`;

  return {
    title,
    description,
  };
}

const Vendor = async ({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const vendorId = searchParams["mid"];

  // promise all
  // getVendorDetails
  const responses = await Promise.all([
    searchProducts(
      {
        offset: 0,
        limit: 15,
      },
      {
        ...searchParams,
        tenant: vendorId,
      }
    ),
    getVendorDetails({
      id: vendorId,
    }),
  ]);

  const products = responses[0].products;
  const totalCount = responses[0].totalCount;
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
        params={{
          ...searchParams,
          tenant: vendorId,
        }}
      />
    </>
  );
};

export default Vendor;
