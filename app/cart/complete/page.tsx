import Button from "@/components/Button";
import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import clsx from "clsx";
import Link from "next/link";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Tamamlandı"),
    description: "Sipariş tamamlandı sayfası",
  };
};

const OrderCompletePage: React.FC = async () => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center h-full space-y-8",
        "text-center font-mono"
      )}
    >
      <h1 className="text-3xl font-semibold">Sipariş Tamamlandı</h1>
      <p className="text-lg text-center">
        Siparişiniz başarıyla alındı. <br />
        Sipariş detaylarınızı mail adresinize gönderdik.
      </p>
      <Link href="/">
        <Button color="primary">Alışverişe Devam Et</Button>
      </Link>
    </div>
  );
};

export default OrderCompletePage;
