"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5/";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { getProductsPricesByIds } from "@/app/products/actions";
import useCart from "@/store/cart";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cartStepperPaths } from "../../constants";
import CartDrawer from "./CartDrawer";

interface Pricing {
  total_discount: number;
  total_discount_price: number;
  total_price: number;
}

const CartSummary = () => {
  const { cartItems } = useCart();
  const { push } = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formTarget, setFormTarget] = useState<string | undefined>(undefined);
  const [pricing, setPricing] = useState<Pricing>({
    total_discount: 0,
    total_discount_price: 0,
    total_price: 0,
  });
  const [paths] = useState<string[]>(() =>
    cartStepperPaths.map((step) => step.path)
  );

  const isCartPage = useCallback(
    (nextPath: string) => {
      const specials = cartItems.filter(
        (item) => item.specialInstructions !== null
      );

      const hasEmptySpecialInstructions = specials.some((spec) => {
        if (spec.specialInstructions?.length < spec.quantity) {
          return true;
        }

        if (spec.specialInstructions?.length === 0) {
          return true;
        } else {
          return spec.specialInstructions?.some((instruction) => {
            if (instruction) {
              return Object.values(instruction).some((value) => !value);
            } else {
              return true;
            }
          });
        }
      });

      if (hasEmptySpecialInstructions) {
        toast.error("Lütfen tüm özel istekleri doldurunuz.", {
          icon: "⚠️",
          position: "bottom-right",
        });
      } else {
        push(nextPath);
      }
    },
    [cartItems, push]
  );

  const [ids] = useState(() =>
    cartItems?.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }))
  );

  const fetchProducts = useCallback(async () => {
    const { total_discount, total_discount_price, total_price } =
      await getProductsPricesByIds(ids);
    if (!total_discount_price && !total_discount && !total_price) return;
    setPricing({
      total_discount,
      total_discount_price,
      total_price,
    });
  }, [cartItems, ids]);

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  const handlePageChange = () => {
    if (pathname === paths[0]) {
      isCartPage(paths[1]);
      return;
    }
  };

  const { total_discount, total_discount_price, total_price } = pricing;

  useEffect(() => {
    switch (pathname) {
      case paths[1]:
        setFormTarget("order-detail-form");
        break;
      case paths[2]:
        setFormTarget("credit-card-form");
        break;
      default:
        setFormTarget(undefined);
        break;
    }
  }, [pathname]);

  return (
    <>
      <div className="hidden md:block">
        <div className="bg-white border rounded-lg py-2 px-3">
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">
                {total_discount_price?.toFixed(2)} ₺
              </span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 ₺</span>
            </div>
            {total_discount ? (
              <div className="flex justify-between text-slate-100 mt-4 text-sm p-2 bg-red-300 rounded-md">
                <span>Toplam kazancınız</span>
                <span className="font-semibold">
                  {total_discount?.toFixed(2)} ₺{" "}
                </span>
              </div>
            ) : null}

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
                {total_price?.toFixed(2)} ₺
              </span>
            </div>
            <Button
              type={formTarget ? "submit" : "button"}
              size="large"
              color="primary"
              className="flex justify-center w-full mt-3"
              label="Onayla ve Devam Et"
              onClick={handlePageChange}
              form={formTarget}
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-full py-4 flex justify-between md:hidden">
        <div className="flex">
          <Button
            icon={<MdKeyboardArrowUp />}
            size="small"
            iconSize={24}
            className="p-2"
            onClick={() => setIsOpen(true)}
          />
          <span className="flex flex-col justify-center ml-2">
            <span className="text-xs">Toplam:</span>
            <span className="text-md text-primary font-medium">
              {total_price?.toFixed(2)} ₺
            </span>
          </span>
        </div>
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
