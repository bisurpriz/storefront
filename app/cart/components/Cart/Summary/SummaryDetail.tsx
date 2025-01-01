"use client";

import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { CouponMessages } from "@/contexts/CartContext/constants";
import clsx from "clsx";
import { Ticket, TicketCheck, TicketX } from "lucide-react";
import { motion } from "motion/react";
import { FC, useCallback, useMemo, useRef } from "react";

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

  const handleCouponSubmit = useCallback(() => {
    const value = inputRef.current?.value;
    if (value && onDiscountCodeSubmit) {
      onDiscountCodeSubmit(value);
    }
  }, [onDiscountCodeSubmit]);

  const handleCouponRemove = useCallback(() => {
    if (handleRemoveCoupon) {
      handleRemoveCoupon();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [handleRemoveCoupon]);

  const formattedCost = useMemo(() => {
    const numericCost = typeof cost === "number" ? cost : parseFloat(cost);
    return isNaN(numericCost) ? "0.00" : numericCost.toFixed(2);
  }, [cost]);

  const formattedTotalWithDiscount = useMemo(() => {
    const total = totalWithDiscount ?? cost;
    const numericTotal = typeof total === "number" ? total : parseFloat(total);
    return isNaN(numericTotal) ? "0.00" : numericTotal.toFixed(2);
  }, [totalWithDiscount, cost]);

  const couponMessageText = useMemo(() => {
    if (isCouponApplied) return CouponMessages.COUPON_SUCCESS;
    return CouponMessages[couponMessage as keyof typeof CouponMessages] || "";
  }, [isCouponApplied, couponMessage]);

  const showCouponMessage = useMemo(() => {
    return (
      isCouponApplied ||
      (couponMessage && couponMessage !== CouponMessages.COUPON_SUCCESS)
    );
  }, [isCouponApplied, couponMessage]);

  if (!isOpen) return null;

  return (
    <div className="max-md:border-t max-md:px-4 max-md:py-1 md:p-4">
      <span className="mb-3 block w-full text-center text-xl font-normal">
        Sipariş Özeti
      </span>
      <div className="flex flex-col">
        <div className="flex justify-between py-1 text-sm">
          <span>Ara Toplam</span>
          <span className="font-semibold">{formattedCost} ₺</span>
        </div>

        {isCouponApplied && (
          <div className="flex justify-between py-1 text-sm">
            <span>İndirim</span>
            <span className="font-semibold line-through">
              {discountAmount.toFixed(2)} ₺
            </span>
          </div>
        )}

        <div className="mt-1 py-3 text-sm xl:flex xl:justify-between">
          <TextField
            icon={<Ticket className="h-6 w-6" />}
            placeholder="İndirim Kodu Girin"
            id="discountCode"
            fullWidth
            ref={inputRef}
            disabled={isCouponApplied}
          />
          {isCouponApplied ? (
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="mt-2 flex w-full justify-center xl:ml-3 xl:mt-0 xl:w-auto"
              onClick={handleCouponRemove}
              icon={<TicketX className="mr-2 h-4 w-4" />}
            >
              Kaldır
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="default"
              className="mt-2 flex w-full justify-center xl:ml-3 xl:mt-0 xl:w-auto"
              onClick={handleCouponSubmit}
              icon={<TicketCheck className="mr-2 h-4 w-4" />}
            >
              Kullan
            </Button>
          )}
        </div>

        <AnimationExitProvider show={showCouponMessage}>
          <motion.span
            id="couponMessage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={couponMessage}
            className={clsx(
              "select-none text-center text-xs text-primary",
              isCouponApplied
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700",
              "p-2",
              "rounded-lg",
              "max-md:w-full",
            )}
          >
            <p
              className={clsx(
                "text-center",
                isCouponApplied ? "text-green-700" : "text-red-700",
              )}
            >
              {couponMessageText}
            </p>
          </motion.span>
        </AnimationExitProvider>

        <div className="mt-1 flex items-center justify-between border-t py-1 text-sm">
          <span className="font-medium">Toplam</span>
          <span className="text-xl font-semibold text-primary">
            {formattedTotalWithDiscount} ₺
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetail;
