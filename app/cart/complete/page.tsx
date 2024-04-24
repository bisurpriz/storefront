"use client";

import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { FC, useCallback, useEffect } from "react";

const OrderCompletePage: FC = () => {
  const { clearCart } = useCart();

  const handleClearCart = useCallback(() => {
    localStorage.removeItem("detail-data");
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    return () => {
      handleClearCart();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 w-full h-full bg-gray-100 gap-8 rounded-md">
      <h1 className="text-4xl font-bold mb-4">Siparişiniz Alındı</h1>
      <p className="text-lg text-gray-600 mb-8">
        Siparişiniz en kısa sürede hazırlanıp yola çıkacaktır.
      </p>
      <Link href={"/"}>Alışverişe Devam Et</Link>
      <Link href={"/account/orders"}>
        <Button color="secondary">Siparişlerim</Button>
      </Link>
    </div>
  );
};

export default OrderCompletePage;
