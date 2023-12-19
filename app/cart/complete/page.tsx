import Button from "@/components/Button";
import React from "react";

const OrderCompletePage: React.FC = async () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-8 rounded-md">
      <h1 className="text-4xl font-bold mb-4">Siparişiniz Alındı</h1>
      <p className="text-lg text-gray-600 mb-8">
        Siparişiniz en kısa sürede hazırlanıp yola çıkacaktır.
      </p>
      <Button>Alışverişe Devam Et</Button>
      <Button color="secondary">Siparişlerim</Button>
    </div>
  );
};

export default OrderCompletePage;
