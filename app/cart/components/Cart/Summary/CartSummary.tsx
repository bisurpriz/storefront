"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";

import { useCart } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";
import { CartStepPaths } from "../../../constants";
import SummaryDetail from "./SummaryDetail";
import clsx from "clsx";
import useResponsive from "@/hooks/useResponsive";
import { createPortal } from "react-dom";
import ChevronUp from "@/components/Icons/ChevronUp";
import { useRouter } from "next/navigation";
import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import { motion } from "framer-motion";
import { useContract } from "@/contexts/ContractContext";
import CheckContract from "./CheckContract";

const CartSummary = () => {
  const {
    cartState: { cost },
    loading,
    applyCouponCode,
  } = useCart();

  const { openApproveContract, approveContract, setApproveContract } =
    useContract();

  const pathname = usePathname();
  const { push } = useRouter();
  const { isTablet } = useResponsive();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeStep = () => {
    if (pathname === CartStepPaths.CART) push(CartStepPaths.ORDER_DETAIL);
  };

  useEffect(() => {
    if (!isTablet) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isTablet]);

  if (typeof document === "undefined") {
    return null;
  }

  if (
    pathname === CartStepPaths.COMPLETE ||
    pathname.startsWith(CartStepPaths.CUSTOMIZE)
  ) {
    return null;
  }

  const pagePathForm = {
    [CartStepPaths.CHECKOUT]: "credit-card-form",
    [CartStepPaths.ORDER_DETAIL]: "order-detail-form",
  };

  const handleDiscountCodeSubmit = async (couponCode: string) => {
    await applyCouponCode(couponCode);
  };

  const handleRemoveCoupon = async () => {
    await applyCouponCode("");
  };

  return (
    <div
      className={clsx(
        "bg-white  col-span-1 md:h-fit border border-slate-200 rounded-xl relative",
        "max-md:border-none md:overflow-hidden"
      )}
    >
      {isTablet ? (
        createPortal(
          <AnimationExitProvider show={isOpen}>
            <motion.div
              className="max-md:absolute max-md:left-0 max-md:bottom-full max-md:w-full bg-white"
              initial={{ y: 20 }}
              animate={{ y: 0, zIndex: -1 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.1 }}
            >
              <SummaryDetail
                cost={cost.totalPrice}
                couponMessage={cost.couponMessage}
                isCouponApplied={cost.isCouponApplied}
                onDiscountCodeSubmit={handleDiscountCodeSubmit}
                discountAmount={cost.discountAmount}
                isOpen={isOpen}
                totalWithDiscount={cost.totalWithDiscount}
                handleRemoveCoupon={handleRemoveCoupon}
              />
              {pathname === CartStepPaths.CHECKOUT && (
                <CheckContract
                  openApproveContract={openApproveContract}
                  approveContract={approveContract}
                />
              )}
            </motion.div>
          </AnimationExitProvider>,
          document?.getElementById("cart-summary") || document?.body
        )
      ) : (
        <>
          <SummaryDetail
            cost={cost.totalPrice}
            couponMessage={cost.couponMessage}
            isCouponApplied={cost.isCouponApplied}
            isOpen={isOpen}
            onDiscountCodeSubmit={handleDiscountCodeSubmit}
            discountAmount={cost.discountAmount}
            totalWithDiscount={cost.totalWithDiscount}
            handleRemoveCoupon={handleRemoveCoupon}
          />
          {pathname === CartStepPaths.CHECKOUT && (
            <CheckContract
              setApproveContract={setApproveContract}
              openApproveContract={openApproveContract}
              approveContract={approveContract}
            />
          )}
        </>
      )}
      <div
        className={clsx(
          "max-md:w-full max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-0  max-md:bg-white max-md:grid max-md:grid-cols-3 z-[12]",
          "max-xs:mb-14 max-md:mb-[72px]"
        )}
        id="cart-summary"
      >
        <span
          className={clsx(
            "col-span-1 flex items-center justify-between p-2 gap-4",
            "md:hidden"
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronUp
            className={clsx(
              "text-primary md:hidden transform transition-transform duration-300",
              isOpen ? "rotate-180" : ""
            )}
          />
          <span className="flex flex-col items-start justify-between text-xs whitespace-nowrap flex-1">
            <p className="text-slate-600">Toplam</p>
            <p className="text-primary font-semibold text-sm">
              {cost.totalPrice} ₺
            </p>
          </span>
        </span>
        <Button
          disabled={
            loading || (!approveContract && pathname === CartStepPaths.CHECKOUT)
          }
          type={
            pagePathForm[pathname as keyof typeof pagePathForm]
              ? "submit"
              : "button"
          }
          size="large"
          color="primary"
          form={
            pagePathForm[pathname as keyof typeof pagePathForm] || undefined
          }
          label={
            pathname === CartStepPaths.CHECKOUT
              ? "Ödeme Yap"
              : "Onayla ve Devam Et"
          }
          className={clsx(
            "flex justify-center rounded-t-none w-full",
            "max-md:rounded-none max-md:col-span-2"
          )}
          onClick={changeStep}
        />
      </div>
    </div>
  );
};

export default CartSummary;
