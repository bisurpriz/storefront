"use client";

import { Button } from "@/components/ui/button";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import AnimationExitProvider from "@/components/AnimatePresence/AnimationExitProvider";
import { useCart } from "@/contexts/CartContext";
import { useContract } from "@/contexts/ContractContext";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { useProgress } from "react-transition-progress";
import { CartStepPaths } from "../../../constants";
import CheckContract from "./CheckContract";
import SummaryDetail from "./SummaryDetail";

const pagePathForm = {
  [CartStepPaths.CHECKOUT]: "credit-card-form",
  [CartStepPaths.ORDER_DETAIL]: "order-detail-form",
};

const CartSummary = () => {
  const {
    cartState: { cost },
    loading,
    applyCouponCode,
  } = useCart();

  const { openApproveContract, approveContract, setApproveContract } =
    useContract();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push, replace } = useRouter();
  const { isTablet } = useResponsive();
  const startProgress = useProgress();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const currentStep = Number(searchParams.get("step") || "1");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isTablet) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isTablet]);

  const changeStep = useCallback(() => {
    startTransition(async () => {
      if (pathname === CartStepPaths.CART) {
        startProgress();
        push(`${CartStepPaths.ORDER_DETAIL}?step=1`);
        return;
      }

      if (pathname === CartStepPaths.ORDER_DETAIL) {
        const orderDetailForm = document.getElementById("order-detail-form");
        if (orderDetailForm) {
          const formEvent = new Event("submit", { cancelable: true });
          const shouldSubmit = await orderDetailForm.dispatchEvent(formEvent);

          if (shouldSubmit) {
            if (currentStep === 1) {
              const params = new URLSearchParams(searchParams);
              params.set("step", "2");
              replace(`?${params.toString()}`);
            } else if (currentStep === 2) {
              startProgress();
              push(CartStepPaths.CHECKOUT);
            }
          }
        }
        return;
      }

      // Handle checkout form submission
      const orderDetailForm = document.getElementById("order-detail-form");
      if (orderDetailForm) {
        const formEvent = new Event("submit", { cancelable: true });
        await orderDetailForm.dispatchEvent(formEvent);
      }
    });
  }, [pathname, push, startProgress, currentStep, searchParams, replace]);

  const handleDiscountCodeSubmit = useCallback(
    async (couponCode: string) => {
      await applyCouponCode(couponCode);
    },
    [applyCouponCode],
  );

  const handleRemoveCoupon = useCallback(async () => {
    await applyCouponCode("");
  }, [applyCouponCode]);

  const customizePath = useMemo(
    () => pathname.split("/").slice(0, 3).join("/"),
    [pathname],
  );

  const shouldRenderContent = useMemo(() => {
    if (typeof document === "undefined" || !mounted) return false;
    if (
      customizePath === CartStepPaths.COMPLETE ||
      customizePath.startsWith(CartStepPaths.CUSTOMIZE)
    )
      return false;
    return true;
  }, [customizePath, mounted]);

  const summaryContent = useMemo(
    () => (
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
    ),
    [cost, isOpen, handleDiscountCodeSubmit, handleRemoveCoupon],
  );

  const checkContractContent = useMemo(
    () =>
      pathname === CartStepPaths.CHECKOUT && (
        <CheckContract
          openApproveContract={openApproveContract}
          approveContract={approveContract}
          setApproveContract={setApproveContract}
        />
      ),
    [pathname, openApproveContract, approveContract, setApproveContract],
  );

  if (!shouldRenderContent) return null;

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
              {summaryContent}
              {checkContractContent}
            </motion.div>
          </AnimationExitProvider>,
          document?.getElementById("cart-summary") || document?.body,
        )
      ) : (
        <>
          {summaryContent}
          {checkContractContent}
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
