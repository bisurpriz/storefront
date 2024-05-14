"use client";
import { memo } from "react";
import { IoTicketOutline } from "react-icons/io5";
import Button from "@/components/Button";
import TextField from "@/components/TextField";

import { useCart } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";
import { useCartStep } from "@/contexts/CartContext/CartStepProvider";
import { CartStepPaths } from "../../constants";

const CartSummary = () => {
  const { cost } = useCart();
  const pathname = usePathname();
  const { handleChangeStep } = useCartStep();

  const changeStep = () => {
    if (pathname !== CartStepPaths.ORDER_DETAIL) {
      handleChangeStep();
    }
  };

  if (pathname === CartStepPaths.COMPLETE) {
    return null;
  }

  return (
    <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg border border-primary rounded-xl overflow-hidden">
      <div className="hidden md:block">
        <div className="p-4">
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">{cost} ₺</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 ₺</span>
            </div>

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextField
                icon={<IoTicketOutline />}
                placeholder="İndirim Kodu Girin"
                id="discountCode"
                fullWidth
              />
              <Button
                type="button"
                size="small"
                color="primary"
                className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                label="İndirim Kodu Kullan"
              />
            </div>
            <div className="flex justify-between items-center text-sm border-t py-1 mt-1">
              <span className="font-medium">Toplam</span>
              <span className="font-semibold text-xl text-primary ">
                {cost} ₺
              </span>
            </div>
          </div>
        </div>
        <Button
          type={pathname === CartStepPaths.ORDER_DETAIL ? "submit" : "button"}
          size="large"
          color="primary"
          fullWidth
          form={
            pathname === CartStepPaths.ORDER_DETAIL
              ? "order-detail-form"
              : undefined
          }
          label={
            pathname === CartStepPaths.CHECKOUT
              ? "Ödeme Yap"
              : "Onayla ve Devam Et"
          }
          className="flex justify-center rounded-t-none"
          onClick={changeStep}
        />
      </div>
    </div>
  );
};

export default memo(CartSummary);
