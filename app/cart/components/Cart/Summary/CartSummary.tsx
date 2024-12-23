"use client";

import { Button } from "@/components/ui/button";
import { startTransition, useEffect, useState } from "react";

import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import ChevronUp from "@/components/Icons/ChevronUp";
import { useCart } from "@/contexts/CartContext";
import { useContract } from "@/contexts/ContractContext";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useProgress } from "react-transition-progress";
import { CartStepPaths } from "../../../constants";
import CheckContract from "./CheckContract";
import SummaryDetail from "./SummaryDetail";

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
  const startProgress = useProgress();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeStep = () => {
    startTransition(() => {
      startProgress();
      if (pathname === CartStepPaths.CART) push(CartStepPaths.ORDER_DETAIL);
    });
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
  const customizePath = pathname.split("/").slice(0, 3).join("/");

  if (
    customizePath === CartStepPaths.COMPLETE ||
    customizePath.startsWith(CartStepPaths.CUSTOMIZE)
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

  if (!mounted) return null;

  return (
    <div
      className={clsx(
        "relative col-span-1 rounded-md border border-slate-200 bg-white md:h-fit",
        "max-md:border-none md:overflow-hidden",
      )}
    >
      {isTablet ? (
        createPortal(
          <AnimationExitProvider show={isOpen}>
            <motion.div
              className="bg-white max-md:absolute max-md:bottom-full max-md:left-0 max-md:w-full"
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
          document?.getElementById("cart-summary") || document?.body,
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
          "z-[12] max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:grid max-md:w-full max-md:grid-cols-3 max-md:bg-white",
          "max-md:mb-[72px] max-xs:mb-14",
        )}
        id="cart-summary"
      >
        <span
          className={clsx(
            "col-span-1 flex items-center justify-between gap-4 p-2",
            "md:hidden",
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronUp
            className={clsx(
              "transform text-primary transition-transform duration-300 md:hidden",
              isOpen ? "rotate-180" : "",
            )}
          />
          <span className="flex flex-1 flex-col items-start justify-between whitespace-nowrap text-xs">
            <p className="text-slate-600">Toplam</p>
            <p className="text-sm font-semibold text-primary">
              {cost.totalPrice} ₺
            </p>
          </span>
        </span>
        <Button
          loading={loading}
          type={
            pagePathForm[pathname as keyof typeof pagePathForm]
              ? "submit"
              : "button"
          }
          size="lg"
          variant="default"
          form={
            pagePathForm[pathname as keyof typeof pagePathForm] || undefined
          }
          className={clsx(
            "flex w-full justify-center rounded-t-none",
            "max-md:col-span-2 max-md:rounded-none",
          )}
          onClick={changeStep}
        >
          {pathname === CartStepPaths.CHECKOUT
            ? "Ödeme Yap"
            : "Onayla ve Devam Et"}
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
