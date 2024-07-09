import PaymentMethods from "@/app/(feed)/[category-slug]/components/Detail/PaymentMethods";
import ProductImageGalleryLoading from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { ReactNode, Suspense } from "react";

// export async function generateMetadata({ params, searchParams }) {
//   const {
//     product: { name, description, image_url, category },
//   } = await getProductById({
//     id: Number(searchParams.pid),
//   });

//   return {
//     title: name,
//     description: description,
//     image: image_url?.[0],
//     category: category.name,
//   } as Metadata;
// }

export default async function ProductExample({
  children,
  information,
  action,
  description,
  recommended,
  comments,
}: {
  children: ReactNode;
  information: ReactNode;
  action: ReactNode;
  description: ReactNode;
  recommended: ReactNode;
  comments: ReactNode;
}) {
  // const jsonld = createJSONLd({
  //   data: {
  //     name: product.name,
  //     description: product.description,
  //     image: `${IMAGE_URL}/${product.image_url?.[0]}`,
  //     offers: {
  //       "@type": "Offer",
  //       price: product.price,
  //       priceCurrency: "TRY",
  //       availability: "https://schema.org/InStock",
  //       url: `https://www.bonnmarse.com/${params["category-slug"]}/${params["product-slug"]}?pid=${productId}`,
  //     },
  //     seller: {
  //       "@type": "Organization",
  //       name: tenant.tenants?.[0]?.name,
  //       url: `https://www.bonnmarse.com/vendor/${tenant.tenants?.[0]?.id}`,
  //       logo: tenant.tenants?.[0]?.logo,
  //     },
  //   },
  //   type: "Product",
  // });

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-md:flex-col gap-6 flex-nowrap"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-full">
          <Suspense fallback={<ProductImageGalleryLoading />}>
            {children}
          </Suspense>
        </div>
        <div className="w-1/2 max-md:w-full">
          {information}
          {action}
        </div>
      </section>

      <section
        className="mt-6"
        aria-labelledby="product-detail"
        aria-describedby="Ürün Detayları"
        id="product-detail"
      >
        {description}
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
        {recommended}
      </section>
      <section
        className="mt-6"
        id="reviews"
        aria-labelledby="reviews"
        aria-describedby="Yorumlar"
      >
        {comments}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        /> */}
      </section>
    </div>
  );
}
