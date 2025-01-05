import PaymentMethods from "@/app/(feed)/components/Detail/PaymentMethods";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import { ReactNode } from "react";

export const experimental_ppr = true;

export const revalidate = 3600;

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
  return (
    <div className="h-full">
      <Breadcrumb />

      <section
        className="flex flex-nowrap items-start justify-start gap-6 max-md:flex-col max-sm:gap-2"
        id="detail"
        aria-labelledby="detail"
        aria-describedby="Ürün detayları"
      >
        <div className="z-0 w-1/2 max-md:w-full">{children}</div>
        <div className="z-0 w-1/2 max-md:w-full">
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
