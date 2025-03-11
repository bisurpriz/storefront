import ServerInfinityScroll from "@/components/InfinityScroll/ServerInfinityScroll";
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Filters, { FilterTypes } from "../../../components/Filters/Filters";
import {
  getVendorCoupons,
  getVendorDetails,
  getVendorProductScoreAverage,
  getVendorReviews,
} from "../actions";
import TenantHeader from "../components/TenantHeader";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Mağaza`;
  const description = `Mağaza Ürünleri`;

  return {
    title,
    description,
  };
}

// Mağaza sayfasında kullanılacak filtreler
const STORE_FILTERS: FilterTypes[] = [
  "price",
  "sameDayDelivery",
  "customizable",
];

const Vendor = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const vendorId = searchParams["mid"];

  const responses = await Promise.all([
    getVendorDetails({
      id: vendorId,
    }),
    getVendorReviews({
      id: vendorId,
    }),
    getVendorProductScoreAverage({
      id: vendorId,
    }),
    getVendorCoupons({
      id: vendorId,
    }),
  ]);

  const tenantDetails = responses[0];

  const reviewsCount = responses[1]?.review_aggregate?.aggregate.count ?? 0;
  const productScoreAverage =
    responses[2]?.product_aggregate?.aggregate.avg.score ?? 0;
  const coupons = responses[3]?.coupon ?? [];
  const couponsCount = responses[3]?.coupon_aggregate.aggregate.count;

  const { device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <div className="space-y-6">
      <TenantHeader
        title={tenantDetails.name}
        joinedDate={tenantDetails.created_at}
        logoUrl={tenantDetails.logo}
        id={tenantDetails.id}
        productsCount={tenantDetails.owner.products_aggregate.aggregate.count}
        reviewsCount={reviewsCount}
        productScoreAverage={productScoreAverage}
        couponsCount={couponsCount}
        coupons={coupons}
      />

      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="lg:col-span-1">
            <Filters
              filterTypes={STORE_FILTERS}
              className="sticky top-6"
              isMobile={isMobile}
            />
          </div>
          <div className="lg:col-span-4">
            <ServerInfinityScroll
              searchParams={{
                ...searchParams,
                tenant: vendorId,
              }}
              hasFilter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
