import PaymentMethods from "@/app/products/[slug]/components/Detail/PaymentMethods";
import ProductActions from "@/app/products/[slug]/components/Detail/ProductActions";
import ProductComments from "@/app/products/[slug]/components/Detail/ProductComments";
import ProductDescription from "@/app/products/[slug]/components/Detail/ProductDescription";
import ProductImageCarousel from "@/app/products/[slug]/components/Detail/ProductImageCarousel";
import ProductInformation from "@/app/products/[slug]/components/Detail/ProductInformation";
import Promotions from "@/app/products/[slug]/components/Detail/Promotions";
import SearchLocation from "@/app/products/[slug]/components/Layout/SearchLocation";
import { getProductById } from "@/app/products/actions";
import HourSelect from "@/components/DatePicker/HourSelect";
import { IMAGE_URL } from "@/contants/urls";
import { destructClaims } from "@/utils/getClaims";
import { getSession } from "@auth0/nextjs-auth0";
import { HiOutlineArchive, HiOutlineTicket } from "react-icons/hi";

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

  const session = null;
  const claims = destructClaims(session?.user);
  const isFavoriteForCurrentUser = data.favorites.data.some((favorite) => favorite.user_id === claims?.id);

  const shippingType = data.product.delivery_type;
  const freeShipping = data.product.is_service_free;

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-md:flex-col gap-6"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-full">
          <ProductImageCarousel
            images={data.product.image_url?.map((url: string) => ({
              id: url,
              url: `${IMAGE_URL}/${url}`,
            }))}
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <Promotions
            promotions={[
              {
                description: shippingType?.includes("SAME_DAY") ? "Gün içi teslimat" : "Aynı gün kargo",
                icon: <HiOutlineTicket />,
              },
              {
                description: freeShipping ? "Ücretsiz kargo" : "Ücretli gönderim",
                icon: <HiOutlineArchive />,
              },
            ]}
          />
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
          />
          <SearchLocation className="mt-6" />
          <HourSelect className="mt-6" />
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

      <section className="mt-6" id="reviews">
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
      <section className="mt-6" id="comments" aria-labelledby="comments" aria-describedby="Ürün yorumları">
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
