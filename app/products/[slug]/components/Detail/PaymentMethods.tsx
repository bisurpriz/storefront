import AccordionItem from "@/components/Accordion/AccordionItem";
import amex from "@/public/payment/amex.png";
import mastercard from "@/public/payment/mastercard.png";
import visa from "@/public/payment/visa.png";
import safepay from "@/public/payment/safepay.png";
import Image from "next/image";
import iyzico from "@/public/payment/iyzico.png";

const paymentMethods = [
  {
    name: "Mastercard",
    image: mastercard,
  },
  {
    name: "Visa",
    image: visa,
  },
  {
    name: "Amex",
    image: amex,
  },
  {
    name: "Safepay",
    image: safepay,
  },
];

const PaymentMethods = () => {
  return (
    <AccordionItem
      isOpen={false}
      title="Ödeme Yöntemleri"
      bordered
      content={
        <div className="flex items-center justify-center w-full">
          <Image src={iyzico} alt="iyzico" width={1024} height={1024} />
        </div>
      }
      className="rounded-lg"
    />
  );
};

export default PaymentMethods;
