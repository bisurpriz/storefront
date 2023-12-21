import { getPaginatedProducts } from "@/app/products/actions";
import { Product } from "@/common/types/Product/product";
import InfinityScroll from "@/components/InfinityScroll";

export interface ProductResponse {
  products: Product[];
  totalCount: number;
}

const View1: React.FC = async () => {
  const { products, totalCount } = await getPaginatedProducts<ProductResponse>({
    offset: 0,
  });

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={products}
      dataKey="products"
      query={getPaginatedProducts}
    />
  );
};

export default View1;
