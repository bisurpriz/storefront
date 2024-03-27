import Button from "@/components/Button";
import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import Link from "next/link";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sipariş Tamamlandı"),
    description: "Sipariş tamamlandı sayfası",
  };
};

const OrderCompletePage: React.FC = async () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 w-full h-full bg-gray-100 gap-8 rounded-md">
      <h1 className="text-4xl font-bold mb-4">Siparişiniz Alındı</h1>
      <p className="text-lg text-gray-600 mb-8">
        Siparişiniz en kısa sürede hazırlanıp yola çıkacaktır.
      </p>
      <Link href={"/"}>
        <Button>Alışverişe Devam Et</Button>
      </Link>
      <Link href={"/account/orders"}>
        <Button color="secondary">Siparişlerim</Button>
      </Link>
    </div>
  );
};

export default OrderCompletePage;
