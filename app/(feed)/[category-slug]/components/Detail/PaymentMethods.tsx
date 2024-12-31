import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import iyzico from "@/public/payment/iyzico.png";
import { CreditCard, Info } from "lucide-react";
import Image from "next/image";

const PaymentMethods = () => {
  return (
    <Accordion type="single" collapsible defaultValue="payment-methods">
      <AccordionItem
        value="payment-methods"
        className="overflow-hidden border-none"
      >
        <AccordionTrigger className="gap-2 py-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-500" />
            <span className="text-lg font-semibold">Ödeme Yöntemleri</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Ödeme Bilgileri */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-sm leading-relaxed text-emerald-900">
                  Güvenli ödeme altyapımız ile kredi kartı, banka kartı ve diğer
                  ödeme yöntemleriyle güvenle alışveriş yapabilirsiniz.
                </p>
              </div>
            </div>

            {/* iyzico Logo */}
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white">
              <div className="relative h-[120px] w-full">
                <Image
                  src={iyzico}
                  alt="iyzico güvenli ödeme altyapısı"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentMethods;
