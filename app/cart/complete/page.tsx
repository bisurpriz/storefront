import { Button } from "@/components/ui/button";
import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import clsx from "clsx";
import { Link } from "@/components/Link";

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
        <Button variant="default">Alışverişe Devam Et</Button>
      </Link>
    </div>
  );
};

export default OrderCompletePage;
