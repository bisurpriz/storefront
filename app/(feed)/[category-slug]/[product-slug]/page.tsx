import PaymentMethods from "@/app/products/[slug]/components/Detail/PaymentMethods";
import ProductActions from "@/app/products/[slug]/components/Detail/ProductActions";
import ProductComments from "@/app/products/[slug]/components/Detail/ProductComments";
import ProductDescription from "@/app/products/[slug]/components/Detail/ProductDescription";
import ProductImageCarousel from "@/app/products/[slug]/components/Detail/ProductImageCarousel";
import ProductInformation from "@/app/products/[slug]/components/Detail/ProductInformation";
import { getPaginatedProducts, getProductById } from "@/app/products/actions";
import { ProductForCart } from "@/common/types/Cart/cart";
import AccordionItem from "@/components/Accordion/AccordionItem";
import RecommendedProducts from "@/components/RecommendedProducts";
import { IMAGE_URL } from "@/contants/urls";
import { createJSONLd } from "@/utils/createJSONLd";
import { Metadata } from "next";

export async function generateMetadata({ params, searchParams }) {
  const {
    product: { name, description, image_url, category },
  } = await getProductById({
    id: Number(searchParams.pid),
  });

  return {
    title: name,
    description: description,
    image: image_url?.[0],
    category: category.name,
  } as Metadata;
}

export default async function ProductExample({
  searchParams,
  params,
}: {
  params: {
    "category-slug": string;
    "product-slug": string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const productId = searchParams["pid"];
  const {
    product: {
      category,
      user_favorites: favorites,
      reviews,
      tenant,
      product_customizable_areas,
      ...product
    },
  } = await getProductById({
    id: Number(productId),
  });

  const { products: categoryProducts } = await getPaginatedProducts({
    offset: 0,
    category_slug: params["category-slug"],
  });

  const jsonld = createJSONLd({
    data: {
      name: product.name,
      description: product.description,
      image: `${IMAGE_URL}/${product.image_url?.[0]}`,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        url: `https://www.bonnmarse.com/${params["category-slug"]}/${params["product-slug"]}?pid=${productId}`,
      },
      seller: {
        "@type": "Organization",
        name: tenant.tenants?.[0]?.name,
        url: `https://www.bonnmarse.com/vendor/${tenant.tenants?.[0]?.id}`,
        logo: tenant.tenants?.[0]?.logo,
      },
    },
    type: "Product",
  });

  const shippingType = product.delivery_type;
  const freeShipping = product.is_service_free;

  const isFavorite = favorites.some((fav) => fav.id === product.id);

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
            images={product.image_url?.map((url: string, index) => ({
              id: index,
              url: `${IMAGE_URL}/${url}` as string,
            }))}
          />
        </div>
        <div className="w-1/2 max-md:w-3/4 max-sm:w-full">
          <ProductInformation
            name={product.name}
            price={250}
            rateCounts={{
              1: 1,
              2: 1,
              3: 1,
              4: 1,
              5: 1,
            }}
            rating={
              reviews.reduce((acc, review) => acc + review.score, 0) /
              product.reviews_aggregate.aggregate.count
            }
            reviewCount={product.reviews_aggregate.aggregate.count}
            promotion="Kargo Bedava"
            discountPrice={product.price}
            discountRate={10}
            key={product.id}
            vendor={tenant.tenants?.[0]}
            freeShipping={freeShipping}
            shippingType={shippingType}
          />
          <ProductActions
            product={{
              id: product.id,
              category,
              discount_price: product.discount_price,
              image_url: product.image_url,
              name: product.name,
              price: product.price,
              product_customizable_areas:
                product_customizable_areas as ProductForCart["product_customizable_areas"],
              quantity: 1,
              tenant,
            }}
            favorite={{
              id: favorites[0]?.id,
              isFavorite,
            }}
            favoriteCount={product.user_favorites_aggregate.aggregate.count}
          />
        </div>
      </section>

      <section
        className="mt-6"
        aria-labelledby="product-detail"
        aria-describedby="Ürün Detayları"
        id="product-detail"
      >
        <AccordionItem
          content={
            <ProductDescription
              description={product.description}
              notes={[]}
              specifications={[
                {
                  name: "Renk",
                  value: "Siyah",
                },
              ]}
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
        aria-describedby="Ödeme yöntemleri"
      >
        <PaymentMethods />
      </section>
      <section
        className="mt-6"
        id="recommended-products"
        aria-labelledby="recommended-products"
        aria-describedby="Önerilen Ürünler"
      >
        <RecommendedProducts products={categoryProducts} />
      </section>
      <section
        className="mt-6"
        id="reviews"
        aria-labelledby="reviews"
        aria-describedby="Yorumlar"
      >
        <ProductComments
          comments={Array.from({ length: 5 }).map((_, index) => ({
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
            createdAt: "2021-08-10T12:00:00.000Z",
            firstName: "John",
            lastName: "Doe",
            user_id: index,
            rate: 5,
            user_image_url: "https://picsum.photos/200/300",
            comment_id: index,
            email: "john@doe.com",
          }))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
      </section>
    </div>
  );
}
