"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { FC, useRef } from "react";
import Ticket from "@/components/Icons/Ticket";
import { CouponMessages } from "@/contexts/CartContext/constants";

type SummaryDetailProps = {
  cost: number;
  couponMessage: string;
  isCouponApplied: boolean;
  isOpen: boolean;
  discountAmount: number;
  onDiscountCodeSubmit?: (couponCode: string) => void;
  totalWithDiscount?: number;
};

const SummaryDetail: FC<SummaryDetailProps> = ({
  cost,
  isOpen,
  couponMessage,
  onDiscountCodeSubmit,
  isCouponApplied,
  discountAmount,
  totalWithDiscount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    isOpen && (
      <>
        <div className="max-md:py-1 max-md:px-4 md:p-4 max-md:border-t">
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">
                {parseInt(cost as any)?.toFixed(2)} ₺
              </span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 ₺</span>
            </div>

            {isCouponApplied && (
              <div className="flex justify-between text-sm py-1">
                <span>İndirim</span>
                <span className="font-semibold">
                  {discountAmount.toFixed(2)} ₺
                </span>
              </div>
            )}

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextField
                icon={<Ticket />}
                placeholder="İndirim Kodu Girin"
                id="discountCode"
                fullWidth
                ref={inputRef}
              />
              <Button
                type="button"
                size="small"
                color="primary"
                className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                label="İndirim Kodu Kullan"
                onClick={() => onDiscountCodeSubmit(inputRef.current?.value)}
              />
              <p className="text-xs text-red-500 mt-1" id="couponMessage">
                {CouponMessages[couponMessage as keyof typeof CouponMessages]}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm border-t py-1 mt-1">
              <span className="font-medium">Toplam</span>
              <span className="font-semibold text-xl text-primary ">
                {parseInt(totalWithDiscount ?? (cost as any))?.toFixed(2)} ₺
              </span>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default SummaryDetail;
