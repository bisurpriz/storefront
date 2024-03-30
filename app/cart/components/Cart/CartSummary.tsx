"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cartStepperPaths } from "../../constants";
import CartDrawer from "./CartDrawer";
import SubmitButton from "@/components/Button/SubmitButton";
import { useCart } from "@/contexts/CartContext";

interface Pricing {
  total_discount: number;
  total_discount_price: number;
  total_price: number;
}

const CartSummary = () => {
  const { cartItems } = useCart();

  const { push } = useRouter();
  const pathname = usePathname();
  const [pricing] = useState<Pricing>(() => {
    let total_discount = 0;
    let total_discount_price = 0;
    let total_price = 0;
    cartItems.forEach((item) => {
      total_discount += item.price - item.discount_price;
      total_discount_price += item.discount_price * item.quantity;
      total_price += item.discount_price * item.quantity;
    });
    return {
      total_discount,
      total_discount_price,
      total_price,
    };
  });
  const [formTarget, setFormTarget] = useState<string | undefined>(undefined);

  const paths = useMemo(() => cartStepperPaths.map((step) => step.path), []);

  const isCartPage = useCallback(
    (nextPath: string) => {
      if (cartItems.length > 0) {
        const isCustomizable = cartItems.find(
          (item) => item.product_customizable_areas.length > 0
        );
        if (isCustomizable) {
          const isCustomizableAreaEmpty =
            isCustomizable.product_customizable_areas.find((area) =>
              area?.customizable_area.values?.find((value) => {
                const keys = Object.keys(value);

                if (keys.length === 1) {
                  return value[keys[0]] === "";
                }
              })
            );

          if (isCustomizableAreaEmpty) {
            toast.error("Özelleştirilebilir alanlar boş bırakılamaz.");
            return;
          } else {
            push(nextPath);
          }
        } else {
          push(nextPath);
        }
      }
    },
    [cartItems, push]
  );

  const handlePageChange = useCallback(() => {
    if (pathname === paths[0]) {
      isCartPage(paths[1]);
    }
  }, [pathname, paths, isCartPage]);

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
  }, [pathname, paths]);

  return (
    <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg">
      <div className="hidden md:block">
        <div>
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
            <SubmitButton
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

      <CartDrawer
        totalPrice={total_price}
        totalDiscount={total_discount}
        totalDiscountPrice={total_discount_price}
      />
    </div>
  );
};

export default memo(CartSummary);
