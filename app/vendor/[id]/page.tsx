import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
import { getPaginatedVendorProducts } from "@/app/vendor/actions";
import { getClient } from "@/graphql/lib/client";
import {
  GetVendorProductsWithPaginationDocument,
  GetVendorProductsWithPaginationQuery,
  GetVendorProductsWithPaginationQueryVariables,
} from "@/graphql/queries/vendors/getVendorProducstWithPagination.generated";

type Props = {
  products: any;
  totalCount: number;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Satıcı`;
  const description = `Satıcı Ürünleri`;

  return {
    title,
    description,
  };
}

const Vendor = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await getClient().query<
    GetVendorProductsWithPaginationQuery,
    GetVendorProductsWithPaginationQueryVariables
  >({
    query: GetVendorProductsWithPaginationDocument,
    variables: {
      offset: 0,
      tenant_id: id,
    },
  });

  return (
    <div>
      <div className="w-full flex max-md:flex-col md:gap-8 md:items-center justify-between bg-white rounded-lg p-4 border mb-6 "></div>

      <InfinityScroll
        totalCount={data.product_aggregate.aggregate.count}
        initialData={data.product}
        dataKey="products"
        query={getPaginatedVendorProducts}
      />
    </div>
  );
};

export default Vendor;
