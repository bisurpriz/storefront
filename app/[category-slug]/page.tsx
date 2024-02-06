import { Product } from '@/common/types/Product/product';
import { getPaginatedProducts } from '../products/actions';
import InfinityScroll from '@/components/InfinityScroll';

export interface ProductResponse {
  products: Product[];
  totalCount: number;
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params['category-slug'];

  const { products, totalCount } = await getPaginatedProducts<ProductResponse>({
    offset: 0,
    category_slug: slug,
  });

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={products}
      dataKey="products"
      query={getPaginatedProducts}
    />
  );
}
