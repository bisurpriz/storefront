import PaymentMethods from "@/app/products/[slug]/components/Detail/PaymentMethods";
import ProductActions from "@/app/products/[slug]/components/Detail/ProductActions";
import ProductComments from "@/app/products/[slug]/components/Detail/ProductComments";
import ProductDescription from "@/app/products/[slug]/components/Detail/ProductDescription";
import ProductImageCarousel from "@/app/products/[slug]/components/Detail/ProductImageCarousel";
import ProductInformation from "@/app/products/[slug]/components/Detail/ProductInformation";
import { getProductById } from "@/app/products/actions";
import { IMAGE_URL } from "@/contants/urls";
import { destructClaims } from "@/utils/getClaims";
import { getSession } from "@auth0/nextjs-auth0";

export default async function ProductExample({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const productId = searchParams["pid"];

  const data = await getProductById({ id: Number(productId) });

  const session = await getSession();
  const claims = destructClaims(session?.user);
  const isFavoriteForCurrentUser = data.favorites.data.some(
    (favorite) => favorite.user_id === claims?.id
  );

  const shippingType = data.product.delivery_type;
  const freeShipping = data.product.is_service_free;

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-sm:flex-col gap-6 flex-nowrap"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-1/4 max-sm:w-full">
          <ProductImageCarousel
            images={data.product.image_url?.map((url: string) => ({
              id: url,
              url: `${IMAGE_URL}/${url}`,
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
            rating={data.reviews.data}
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
        id="product-detail"
      >
        <ProductDescription
          title="Ürün Detayları"
          description={data.product.description}
          notes={[]}
          specifications={data.product.properties}
        />
      </section>
      <section
        className="mt-6"
        id="payment-methods"
        aria-labelledby="payment-methods"
        aria-describedby="Ödeme yöntemleri"
      >
        <PaymentMethods />
      </section>
      <section
        className="mt-6"
        id="reviews"
        aria-labelledby="reviews"
        aria-describedby="Yorumlar"
      >
        <ProductComments
          comments={data.reviews.data.map((cm) => ({
            createdAt: cm.created_at,
            comment_id: cm.id,
            rate: cm.score,
            comment: cm.comment,
            user_image_url: cm.user.picture,
          }))}
        />
      </section>
    </div>
  );
}
