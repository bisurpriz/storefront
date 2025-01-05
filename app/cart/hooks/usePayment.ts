import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useContract } from "@/contexts/ContractContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CreditCardForm } from "../components/Checkout/validation";
import { CartStepPaths } from "../constants";
import { initializePayment } from "../services/payment";

export const usePayment = () => {
  const [base64Html, setBase64Html] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const { replace } = useRouter();
  const userData = useUser();
  const { openApproveContract, approveContract } = useContract();
  const {
    cartState: { cartItems, cost },
    clearCart,
    hasCustomizableProduct,
  } = useCart();

  const removeStorages = useCallback(() => {
    sessionStorage.removeItem("order-detail-form");
    localStorage.removeItem("order-detail-form");
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("cost");
  }, []);

  const handlePayment = useCallback(
    async (cardData: CreditCardForm, isTablet: boolean) => {
      if (!approveContract) {
        openApproveContract();
        return;
      }

      try {
        setLoading(true);
        const serialize = sessionStorage.getItem("order-detail-form");
        if (!serialize) throw new Error("Form verisi bulunamadı");

        const detailData = JSON.parse(serialize);

        const couponInfo = cost.isCouponApplied
          ? {
              code: cost.couponCode,
            }
          : undefined;

        const result = await initializePayment({
          cartItems,
          detailData,
          cardData,
          user: userData.user,
          totalPrice: cost.totalWithDiscount,
          isTablet,
          couponInfo,
        });

        setOrderId(result.orderId);
        setBase64Html(result.htmlContent);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
    [
      approveContract,
      cartItems,
      cost.isCouponApplied,
      cost.couponCode,
      cost.totalPrice,
      openApproveContract,
      userData.user,
    ],
  );

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_HOST) return;

      if (event.data === "success") {
        setLoading(false);
        clearCart();
        removeStorages();
        replace(
          hasCustomizableProduct
            ? `${CartStepPaths.CUSTOMIZE}/${orderId}`
            : CartStepPaths.COMPLETE,
        );
      } else if (event.data.errorMessage) {
        setLoading(false);
        setErrorMessage(event.data.errorMessage);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [clearCart, hasCustomizableProduct, orderId, removeStorages, replace]);

  const resetError = useCallback(() => {
    setBase64Html("");
    setErrorMessage("");
  }, []);

  return {
    loading,
    errorMessage,
    base64Html,
    handlePayment,
    resetError,
  };
};
