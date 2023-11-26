"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { CartSummary } from "@/hooks/useCartSummary";
// import { getClient } from "@/graphql/lib/client";
import { ProductForCart } from "../../types/cart";
import { createOrderAction } from "../../actions";
import toast from "react-hot-toast";
import CartDrawer from "./CartDrawer";
import Link from "next/link";
// import { readIdFromCookies } from "@/app/actions";

const CartSummary = ({
  cartSummary: { couponApplied, discount, items, totalPrice, totalQuantity },
  tenantGrouped,
}: {
  cartSummary: CartSummary;
  tenantGrouped: { [key: string]: ProductForCart[] };
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createOrder = async () => {
    try {
      const { data, errors } = await createOrderAction(
        tenantGrouped,
        totalPrice
      );
      console.log(data, errors);
      if (errors) {
        errors.forEach((error) => {
          toast.error(error.message, {
            id: error.message,
            position: "bottom-right",
          });
        });

        return;
      }

      if (data) {
        toast.success("Siparişiniz başarıyla oluşturuldu.", {
          id: "order-created",
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        id: error.message,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="bg-white border rounded-lg py-[8px] px-[12px]">
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">{totalPrice.toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 TL</span>
            </div>
            {discount ? (
              <>
                <div className="flex justify-between text-slate-100 mt-4 text-sm p-2 bg-red-300 rounded-md">
                  <span>Toplam kazancınız</span>
                  <span className="font-semibold">
                    {discount} TL{" "}
                    {couponApplied && "(İndirim Kuponu Kullanıldı)"}
                  </span>
                </div>
              </>
            ) : null}

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextInput
                className="w-full"
                icon={<IoTicketOutline />}
                placeholder="İndirim Kodu Girin"
                id="discount"
              />
              <Button
                size="small"
                color="primary"
                className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                label="İndirim Kodu Kullan"
              />
            </div>
            <div className="flex justify-between items-center text-sm border-t-[1px] py-1 mt-1">
              <span className="font-medium">Toplam</span>
              <span className="font-semibold text-xl text-primary ">
                {totalPrice.toFixed(2)} TL
              </span>
            </div>
          </div>
        </div>
        <Link href={"/order-detail"}>
          <Button
            size="large"
            color="primary"
            className="text-xl pl-16 pr-16 w-full mt-5 flex justify-center"
            label="Sepeti Onayla"
          />
        </Link>
      </div>
      <div className="bg-white w-full py-[16px] flex justify-between md:hidden">
        <div className="flex">
          <Button
            icon={<MdKeyboardArrowUp />}
            size="small"
            iconSize={24}
            className="p-[8px]"
            onClick={() => setIsOpen(true)}
          />
          <span className="flex flex-col justify-center ml-2">
            <span className="text-xs">Toplam:</span>
            <span className="text-md text-primary font-medium">629.99 TL</span>
          </span>
        </div>
        <Button
          className="flex justify-center"
          size="small"
          color="primary"
          label="Sepeti Onayla"
          onClick={createOrder}
        />
      </div>
      <CartDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default CartSummary;
