import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ReceiverForm from "../components/OrderDetail/ReceiverForm";

export const metadata: Metadata = {
  title: getBrandWithTitle("Sipariş Detayı"),
  description:
    "Sipariş detaylarınızı güvenle doldurun ve siparişinizi tamamlayın",
};

export default function OrderDetailPage() {
  return (
    <div className="relative">
      <section
        aria-labelledby="order-detail-title"
        aria-describedby="order-detail-description"
      >
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <ReceiverForm />
        </Suspense>
      </section>
    </div>
  );
}
