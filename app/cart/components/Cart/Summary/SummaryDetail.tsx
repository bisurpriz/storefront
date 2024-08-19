"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { FC, useRef } from "react";
import Ticket from "@/components/Icons/Ticket";
import { CouponMessages } from "@/contexts/CartContext/constants";
import { motion } from "framer-motion";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import clsx from "clsx";
import RemoveTag from "@/components/Icons/RemoveTag";
import ApplyTag from "@/components/Icons/ApplyTag";

type SummaryDetailProps = {
  cost: number;
  couponMessage: string;
  isCouponApplied: boolean;
  isOpen: boolean;
  discountAmount: number;
  onDiscountCodeSubmit?: (couponCode: string) => void;
  totalWithDiscount?: number;
  handleRemoveCoupon?: () => void;
};

const SummaryDetail: FC<SummaryDetailProps> = ({
  cost,
  isOpen,
  couponMessage,
  onDiscountCodeSubmit,
  isCouponApplied,
  discountAmount,
  totalWithDiscount,
  handleRemoveCoupon,
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
                <span className="font-semibold line-through">
                  {discountAmount.toFixed(2)} ₺
                </span>
              </div>
            )}

            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextField
                icon={<Ticket className="w-6 h-6" />}
                placeholder="İndirim Kodu Girin"
                id="discountCode"
                fullWidth
                ref={inputRef}
                disabled={isCouponApplied}
              />
              {isCouponApplied ? (
                <Button
                  type="button"
                  size="small"
                  color="warning"
                  className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                  label="Kaldır"
                  onClick={() => {
                    handleRemoveCoupon?.();
                    inputRef.current!.value = "";
                  }}
                  icon={<RemoveTag className="w-4 h-4 mr-2" />}
                />
              ) : (
                <Button
                  type="button"
                  size="small"
                  color="primary"
                  className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                  label="Kullan"
                  onClick={() => onDiscountCodeSubmit(inputRef.current?.value)}
                  icon={<ApplyTag className="w-4 h-4 mr-2" />}
                />
              )}
            </div>
            <AnimationExitProvider
              show={
                isCouponApplied ||
                (couponMessage &&
                  couponMessage !== CouponMessages.COUPON_SUCCESS)
              }
            >
              <motion.span
                id="couponMessage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={couponMessage}
                className={clsx(
                  "text-xs text-center text-primary select-none",
                  isCouponApplied
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700",
                  "p-2",
                  "rounded-lg",
                  "max-md:w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-center",
                    isCouponApplied ? "text-green-700" : "text-red-700"
                  )}
                >
                  {isCouponApplied
                    ? CouponMessages.COUPON_SUCCESS
                    : CouponMessages[
                        couponMessage as keyof typeof CouponMessages
                      ]}
                </p>
              </motion.span>
            </AnimationExitProvider>
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
