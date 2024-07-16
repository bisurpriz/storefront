import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
import { getPaginatedVendorProducts } from "@/app/vendor/actions";

type Props = {
  products: any;
  totalCount: number;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Vendor`;
  const description = `Vendor Ürünleri`;

  return {
    title,
    description,
  };
}

const Vendor = async ({ params: { id } }: { params: { id: string } }) => {
  const { products, totalCount } = await getPaginatedVendorProducts<Props>({
    offset: 0,
    tenant_id: id,
  });

  return (
    <div>
      <div className="w-full flex max-md:flex-col md:gap-8 md:items-center justify-between bg-white rounded-lg p-4 border mb-6 "></div>

      <InfinityScroll
        totalCount={totalCount}
        initialData={products}
        dataKey="products"
        query={getPaginatedVendorProducts}
      />
    </div>
  );
};

export default Vendor;
