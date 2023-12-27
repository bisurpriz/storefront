"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IoTicketOutline } from "react-icons/io5/";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cartStepperPaths } from "../../constants";
import CartDrawer from "./CartDrawer";
import { ProductForCart } from "@/common/types/Cart/cart";

interface Pricing {
  total_discount: number;
  total_discount_price: number;
  total_price: number;
}

const CartSummary = ({ cartItems }: { cartItems: ProductForCart[] }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [formTarget, setFormTarget] = useState<string | undefined>(undefined);
  const [pricing, setPricing] = useState<Pricing>({
    total_discount: 0,
    total_discount_price: 0,
    total_price: 0,
  });
  const paths = useMemo(() => cartStepperPaths.map((step) => step.path), []);

  const ids = useMemo(
    () =>
      cartItems?.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    [cartItems]
  );

  const isCartPage = useCallback(
    (nextPath: string) => {
      const hasEmptySpecialInstructions = cartItems.some((item) => {
        if (item.product_customizable_areas?.length < item.quantity) {
          return true;
        }

        if (item.product_customizable_areas?.length === 0) {
          return true;
        } else {
          return item.product_customizable_areas?.some((instruction) => {
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

  // const fetchProducts = useCallback(async () => {
  //   if (!ids) return;
  //   const { total_discount, total_discount_price, total_price } =
  //     await getProductsPricesByIds(ids);
  //   setPricing({
  //     total_discount,
  //     total_discount_price,
  //     total_price,
  //   });
  // }, [ids]);

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

      <CartDrawer
        totalPrice={total_price}
        totalDiscount={total_discount}
        totalDiscountPrice={total_discount_price}
      />
    </div>
  );
};

export default memo(CartSummary);
