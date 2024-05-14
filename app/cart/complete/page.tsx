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
    <div className="flex flex-col items-center justify-center p-10 w-full h-full bg-gray-100 gap-4 text-center rounded-md">
      <h1 className="text-4xl font-bold mb-4">Siparişiniz Alındı 🎉</h1>
      <p className="text-lg text-gray-600 mb-2">
        Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.
      </p>
      <div className="flex flex-col-reverse md:flex-row-reverse gap-4 w-full md:w-1/2 justify-center items-center">
        <Link href={"/"}>
          <Button>Alışverişe Devam Et</Button>
        </Link>
        <Link href={"/account/orders"}>
          <Button color="secondary">Siparişlerim</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletePage;
