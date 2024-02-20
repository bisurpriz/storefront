import { getUserById } from '@/app/account/actions'
import PaymentMethods from '@/app/products/[slug]/components/Detail/PaymentMethods'
import ProductActions from '@/app/products/[slug]/components/Detail/ProductActions'
import ProductComments from '@/app/products/[slug]/components/Detail/ProductComments'
import ProductDescription from '@/app/products/[slug]/components/Detail/ProductDescription'
import ProductImageCarousel from '@/app/products/[slug]/components/Detail/ProductImageCarousel'
import ProductInformation from '@/app/products/[slug]/components/Detail/ProductInformation'
import { getProductById } from '@/app/products/actions'
import AccordionItem from '@/components/Accordion/AccordionItem'
import { IMAGE_URL } from '@/contants/urls'
import { createJSONLd } from '@/utils/createJSONLd'
import { Metadata } from 'next'

export async function generateMetadata({ params, searchParams }) {
  const data = await getProductById({
    id: Number(searchParams.pid),
  })

  return {
    title: data.product.name,
    description: data.product.description,
    image: data.product.image_url[0],
    category: data.category.name,
  } as Metadata
}

export default async function ProductExample({
  searchParams,
  params,
}: {
  params: {
    'category-slug': string
    'product-slug': string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const productId = searchParams['pid']
  const data = await getProductById({
    id: Number(productId),
  })

  const jsonld = createJSONLd({
    data: {
      name: data.product.name,
      description: data.product.description,
      image: `${IMAGE_URL}/${data.product.image_url[0]}`,
      offers: {
        '@type': 'Offer',
        price: data.product.price,
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
        url: `https://www.bonnmarse.com/${params['category-slug']}/${params['product-slug']}?pid=${productId}`,
      },
      seller: {
        '@type': 'Organization',
        name: data.tenant.name,
        url: `https://www.bonnmarse.com/vendor/${data.tenant.id}`,
        rating: `${IMAGE_URL}/${data.tenant.rate}`,
      },
    },
    type: 'Product',
  })

  const { user } = await getUserById()
  const isFavoriteForCurrentUser = data.favorites.data.some(
    (favorite) => favorite.user_id === user?.id,
  )

  const shippingType = data.product.delivery_type
  const freeShipping = data.product.is_service_free

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-sm:flex-col gap-6 flex-nowrap"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları">
        <div className="w-1/2 max-md:w-1/4 max-sm:w-full">
          <ProductImageCarousel
            images={data.product.image_url?.map((url: string,index) => ({
              id: index,
              url: `${IMAGE_URL}/${url}` as string,
            }))}
          />
        </div>
        <div className="w-1/2 max-md:w-3/4 max-sm:w-full">
          <ProductInformation
            name={data.product.name}
            price={250}
            rateCounts={{
              1: 1,
              2: 1,
              3: 1,
              4: 1,
              5: 1,
            }}
            rating={data.reviews.data.reduce(
              (acc, review) => acc + review.score,
              0,
            ) / data.reviews.totalCount}
            reviewCount={data.reviews.totalCount}
            promotion="Kargo Bedava"
            discountPrice={data.product.price}
            discountRate={10}
            key={data.product.id}
            vendor={data.tenant}
            freeShipping={freeShipping}
            shippingType={shippingType}
          />
          <ProductActions
            productId={data.product.id}
            favorite={{
              id: data.favorites[0]?.id ?? null,
              isFavorite: isFavoriteForCurrentUser ?? false,
            }}
            favoriteCount={data.favorites.totalCount}
          />
        </div>
      </section>

      <section
        className="mt-6"
        aria-labelledby="product-detail"
        aria-describedby="Ürün Detayları"
        id="product-detail">
        <AccordionItem
          content={
            <ProductDescription
              description={data.product.description}
              notes={[]}
              specifications={data.product.properties}
            />
          }
          title="Ürün Detayları"
          bordered
          isOpen
          className="rounded-lg"
        />
      </section>
      <section
        className="mt-6"
        id="payment-methods"
        aria-labelledby="payment-methods"
        aria-describedby="Ödeme yöntemleri">
        <PaymentMethods />
      </section>
      <section
        className="mt-6"
        id="reviews"
        aria-labelledby="reviews"
        aria-describedby="Yorumlar">
        <ProductComments
          comments={data.reviews.data.map((cm) => ({
            comment: cm.comment,
            comment_id: cm.id,
            createdAt: cm.created_at,
            email: cm.user.email,
            firstName: cm.user.firstname,
            lastName: cm.user.lastname,
            rate: cm.score,
            user_id: cm.user.id,
            user_image_url: cm.user.picture,
          }))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
      </section>
    </div>
  )
}
