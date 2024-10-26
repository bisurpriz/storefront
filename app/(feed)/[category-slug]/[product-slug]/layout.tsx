import PaymentMethods from "@/app/(feed)/[category-slug]/components/Detail/PaymentMethods";
import ProductImageGalleryLoading from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { unstable_noStore } from "next/cache";
import { ReactNode, Suspense } from "react";

export const experimental_ppr = true;

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
  unstable_noStore();

  return (
    <div className="h-full">
      <section
        className="flex items-start justify-start max-md:flex-col gap-6 flex-nowrap"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="w-1/2 max-md:w-full z-0">
          <Suspense fallback={<ProductImageGalleryLoading />}>
            {children}
          </Suspense>
        </div>
        <div className="w-1/2 max-md:w-full z-0">
          {information}
          {action}
        </div>
      </section>

      <section
        className="mt-6 max-md:mt-2"
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
        id="yorumlar"
        aria-labelledby="yorumlar"
        aria-describedby="Kullanıcı Yorumları"
      >
        {comments}
      </section>
    </div>
  );
}
