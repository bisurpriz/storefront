import InfinityScroll from '@/components/InfinityScroll';
import { Metadata } from 'next';
import { getPaginatedVendorProducts } from '@/app/vendor/actions';
import SearchLocation from '@/app/products/[slug]/components/Layout/SearchLocation';

type Props = {
  products: any;
  totalCount: number;
};

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
      <div className="w-full flex max-md:flex-col md:gap-8 md:items-center justify-between bg-white rounded-lg p-4 border mb-6 ">
        <span className="text-center border-primary border text-primary text-sm font-semibold max-md:mb-2 p-2 rounded-lg">
          BURADAN BAŞLAYIN
        </span>
        <SearchLocation />
      </div>

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
