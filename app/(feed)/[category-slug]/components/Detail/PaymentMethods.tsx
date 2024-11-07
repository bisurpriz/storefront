import AccordionItem from "@/components/Accordion/AccordionItem";
import Image from "next/image";
import iyzico from "@/public/payment/iyzico.png";

const PaymentMethods = () => {
  return (
    <AccordionItem
      isOpen={false}
      title="Ödeme Yöntemleri"
      bordered
      content={
        <div className="flex w-full items-center justify-center">
          <Image
            src={iyzico}
            alt="iyzico"
            width={500}
            height={500}
            className="h-full w-full"
          />
        </div>
      }
      className="rounded-lg"
    />
  );
};

export default PaymentMethods;
