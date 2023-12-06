"use client";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { memo, useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import CartDrawer from "./CartDrawer";
import Link from "next/link";
import { getProductsPricesByIds } from "@/app/products/actions";
import useCart from "@/store/cart";

const CartSummary = () => {
  const { cartItems } = useCart();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pricing, setPricing] = useState<{
    total_discount: number;
    total_discount_price: number;
    total_price: number;
  }>({
    total_discount: 0,
    total_discount_price: 0,
    total_price: 0,
  });

  const ids = cartItems?.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const fetchProducts = useCallback(async () => {
    const { total_discount, total_discount_price, total_price } =
      await getProductsPricesByIds(ids);

    setPricing({
      total_discount,
      total_discount_price,
      total_price,
    });
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  const { total_price, total_discount, total_discount_price } = pricing;

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
              <span className="font-semibold">
                {total_discount_price.toFixed(2)} ₺
              </span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 ₺</span>
            </div>
            {total_discount ? (
              <>
                <div className="flex justify-between text-slate-100 mt-4 text-sm p-2 bg-red-300 rounded-md">
                  <span>Toplam kazancınız</span>
                  <span className="font-semibold">
                    {total_discount.toFixed(2)} ₺{" "}
                  </span>
                </div>
              </>
            ) : null}

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextField
                icon={<IoTicketOutline />}
                placeholder="İndirim Kodu Girin"
                id="discount"
                fullWidth
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
                {total_price.toFixed(2)} ₺
              </span>
            </div>
          </div>
        </div>
        <Link href={"/cart/order-detail"}>
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
            <span className="text-md text-primary font-medium">
              {total_price.toFixed(2)} ₺
            </span>
          </span>
        </div>
        <Link href={"/cart/order-detail"}>
          <Button
            className="flex justify-center"
            size="small"
            color="primary"
            label="Sepeti Onayla"
          />
        </Link>
      </div>
      <CartDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        totalPrice={total_price}
        totalDiscount={total_discount}
        totalDiscountPrice={total_discount_price}
      />
    </>
  );
};

export default memo(CartSummary);
