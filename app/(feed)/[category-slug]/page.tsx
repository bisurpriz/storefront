import InfinityScroll from '@/components/InfinityScroll'
import { getPaginatedProducts } from '../../products/actions'



export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params['category-slug']

  const { products, totalCount } = await getPaginatedProducts({
    offset: 0,
    category_slug: slug,
  })

  return (
    <InfinityScroll
      totalCount={totalCount}
      initialData={products}
      dataKey="products"
      query={getPaginatedProducts}
    />
  )
}
