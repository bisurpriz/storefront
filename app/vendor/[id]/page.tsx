import InfinityScroll from "@/components/InfinityScroll";
import { Metadata } from "next";
import { getPaginatedVendorProducts } from "@/app/vendor/actions";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { FaCalendar } from "react-icons/fa";

type Props = {
  vendor: any;
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
  const { vendor, products, totalCount } =
    await getPaginatedVendorProducts<Props>({
      offset: 0,
      tenant_id: id,
    });
  return (
    <div>
      <div className="w-full flex max-md:flex-col md:gap-8 md:items-center justify-between bg-white rounded-lg p-4 border mb-6 ">
        <div className="flex items-center">
          <Image
            src={getImageUrlFromPath(vendor.logo)}
            alt="Vendor Logo"
            className="rounded-full w-14 h-14"
            width={200}
            height={200}
          />
          <h1 className="text-2xl font-semibold tracking-wide ml-3">
            {vendor?.name}
          </h1>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center justify-center p-2 rounded-full border border-primary">
            <FaCalendar className="text-primary" />
          </div>
          <div>
            <div className="text-sm">Bonnmarşe&apos;deki Süresi</div>
            <div className="text-base font-bold">
              {getTimeDifference(vendor.created_at)}
            </div>
          </div>
        </div>
      </div>

      <InfinityScroll
        totalCount={totalCount}
        initialData={products}
        dataKey="products"
        query={getPaginatedVendorProducts}
        useHorizontalCard
      />
    </div>
  );
};

export default Vendor;
