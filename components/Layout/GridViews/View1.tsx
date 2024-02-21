import { getPaginatedProducts } from '@/app/products/actions';
import InfinityScroll from '@/components/InfinityScroll';

const View1: React.FC = async () => {
  const { products, totalCount } = await getPaginatedProducts({
    page: 0,
    limit: 10,
    offset:0
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
