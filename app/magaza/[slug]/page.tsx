import { searchProductsv1 } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
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

  const data = responses?.[0]?.hits.map((hit) => hit.document);
  const totalCount = responses?.[0]?.found;
  const tenantDetails = responses[1];

  const reviewsCount = responses[2].review_aggregate.aggregate.count;
  const productScoreAverage =
    responses[3].product_aggregate.aggregate.avg.score;
  const coupons = responses[4]?.coupon;
  const couponsCount = responses[4]?.coupon_aggregate.aggregate.count;

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
            <Filters filterTypes={STORE_FILTERS} className="sticky top-6" />
          </div>
          <div className="lg:col-span-4">
            <InfinityScroll
              totalCount={totalCount}
              initialData={data}
              query={searchProductsv1}
              params={{
                ...searchParams,
                tenant: vendorId,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
