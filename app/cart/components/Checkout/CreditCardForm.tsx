"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { getIpAddress } from "@/app/actions";
import {
  getConversationId,
  initialize3dsPayment,
} from "@/app/iyzico-payment/actions";
import { Locale } from "@/app/iyzico-payment/types";
import { createBasketItems } from "@/app/iyzico-payment/utils";
import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCardDateInput";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useContract } from "@/contexts/ContractContext";
import usePopup from "@/hooks/usePopup";
import useResponsive from "@/hooks/useResponsive";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Cookies from "js-cookie";
import { Code, MessageCircleWarning, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useProgress } from "react-transition-progress";
import { object, string } from "yup";
import { createOrderAction } from "../../actions";
import { CartStepPaths } from "../../constants";
import { OrderDetailFormData } from "../OrderDetail/ReceiverForm";

export type CreditCardForm = {
  creditCardNumber: string;
  creditCardName: string;
  creditCardDate: string;
  creditCardCvv: string;
};

const getValidationSchema = () =>
  object().shape({
    creditCardNumber: string().test(
      "test-number",
      "Geçersiz kart numarası",
      (value) => {
        if (!value) return false;
        const cleanNumber = value.replace(/\s+/g, "");
        return cleanNumber.startsWith("34") || cleanNumber.startsWith("37")
          ? cleanNumber.length === 15
          : cleanNumber.length === 16;
      },
    ),
    creditCardName: string()
      .required("Kart üzerindeki isim zorunludur")
      .min(5, "İsim en az 5 karakter olmalıdır")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Sadece harf kullanılabilir"),
    creditCardDate: string()
      .required("Son kullanma tarihi geçersiz")
      .test("test-date", "Geçersiz tarih", (value) => {
        if (!value) return false;
        const [month, year] = value.split("/");
        if (!month || !year) return false;

        const currentYear = new Date().getFullYear() % 100;
        const monthNum = Number(month);
        const yearNum = Number(year);

        return yearNum >= currentYear && monthNum >= 1 && monthNum <= 12;
      }),
    creditCardCvv: string()
      .required("CVV zorunludur")
      .matches(/^\d{3}$/, "CVV 3 haneli olmalıdır"),
  });

const CreditCardForm = () => {
  const [base64PasswordHtml, setBase64PasswordHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [createdOrder, setCreatedOrder] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const startProgress = useProgress();
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const userData = useUser();
  const { isTablet } = useResponsive();
  const { renderPopup, openPopup, closePopup } = usePopup();

  const {
    cartState: { cartItems, cost },
    hasCustomizableProduct,
    clearCart,
  } = useCart();

  const schema = useMemo(() => getValidationSchema(), []);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      creditCardNumber: "",
      creditCardName: "",
      creditCardDate: "",
      creditCardCvv: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    startTransition(() => {
      startProgress();
      const serialize = sessionStorage.getItem("order-detail-form");
      if (!serialize) {
        replace(CartStepPaths.CART);
        return;
      }
      try {
        JSON.parse(serialize);
      } catch {
        sessionStorage.removeItem("order-detail-form");
        replace(CartStepPaths.CART);
      }
    });
  }, [replace]);

  const { openApproveContract, approveContract } = useContract();

  const onSubmit = useCallback(
    async (data: CreditCardForm) => {
      if (!approveContract) {
        openApproveContract();
        return;
      }

      startTransition(async () => {
        try {
          startProgress();
          setLoading(true);

          const serialize = sessionStorage.getItem("order-detail-form");
          if (!serialize) throw new Error("Form verisi bulunamadı");

          const detailData: OrderDetailFormData = JSON.parse(serialize);
          const senderNames = detailData.sender_name.trim().split(" ");
          const timeStamps = Date.now();

          const [conversationId, ip] = await Promise.all([
            getConversationId(timeStamps),
            getIpAddress(),
          ]);

          if (!ip) {
            throw new Error("IP Adresi alınamadı");
          }

          const basketId = `${userData.user?.carts[0]?.id ?? Cookies.get(CookieTokens.GUEST_ID)}-${timeStamps}`;

          const couponInfo = cost.isCouponApplied
            ? {
                code: cost.couponCode,
                guest_id: Cookies.get(CookieTokens.GUEST_ID) ?? undefined,
              }
            : undefined;

          const orderRes = await createOrderAction(
            cartItems,
            detailData,
            conversationId,
            couponInfo,
          );

          if (orderRes.status === "error") {
            throw new Error(orderRes.message || "Sipariş oluşturulamadı");
          }

          setCreatedOrder(orderRes.data?.insert_order_one?.id);

          const [month, year] = data.creditCardDate.split("/");
          const paymentRes = await initialize3dsPayment({
            basketId,
            basketItems: createBasketItems(cartItems),
            billingAddress: {
              address: detailData.invoice_company_address,
              city: detailData.invoice_company_address,
              contactName: detailData.sender_name,
              country: "Türkiye",
            },
            shippingAddress: {
              address: detailData.receiver_address,
              city: detailData.receiver_city.label,
              country: "Türkiye",
              contactName: detailData.receiver_name,
            },
            buyer: {
              city: detailData.receiver_city.label,
              country: "Türkiye",
              email: detailData.sender_email,
              gsmNumber: detailData.sender_phone,
              identityNumber: "11111111111",
              ip,
              name: senderNames[0],
              surname: senderNames[senderNames.length - 1],
              registrationAddress: detailData.receiver_address,
              id: userData?.user?.id ?? Cookies.get(CookieTokens.GUEST_ID),
            },
            paymentChannel: isTablet ? "WEB" : "MOBILE_WEB",
            callbackUrl: process.env.NEXT_PUBLIC_IYZICO_CALLBACK_URL,
            conversationId,
            currency: "TRY",
            locale: Locale.TR,
            paidPrice: cost.totalPrice.toString(),
            price: cost.totalPrice.toString(),
            paymentCard: {
              cardHolderName: data.creditCardName,
              cardNumber: data.creditCardNumber.replace(/\s+/g, ""),
              cvc: data.creditCardCvv,
              expireMonth: month,
              expireYear: `20${year}`,
            },
            installment: 1,
          });

          if (paymentRes.errorMessage) {
            throw new Error(paymentRes.errorMessage);
          }

          setBase64PasswordHtml(paymentRes.threeDSHtmlContent);
        } catch (error) {
          setLoading(false);
          setErrorMessage(error.message);
          openPopup();
        }
      });
    },
    [approveContract, cartItems, cost, userData, isTablet, openPopup],
  );

  const removeStorages = useCallback(() => {
    sessionStorage.removeItem("order-detail-form");
    localStorage.removeItem("order-detail-form");
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("cost");
  }, []);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_HOST) return;

      if (event.data === "success") {
        setLoading(false);
        clearCart();
        removeStorages();
        replace(
          hasCustomizableProduct
            ? `${CartStepPaths.CUSTOMIZE}/${createdOrder}`
            : CartStepPaths.COMPLETE,
        );
      } else if (event.data.errorMessage) {
        setLoading(false);
        setErrorMessage(event.data.errorMessage);
        openPopup();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [
    createdOrder,
    clearCart,
    removeStorages,
    replace,
    hasCustomizableProduct,
    openPopup,
  ]);

  const handleClosePopupWithClearStates = useCallback(() => {
    setBase64PasswordHtml("");
    setErrorMessage("");
    closePopup();
  }, [closePopup]);

  return (
    <>
      {renderPopup(
        <div
          className={clsx(
            "w-full max-w-screen-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
            "flex flex-col items-center justify-center gap-2",
            "text-center",
          )}
        >
          <MessageCircleWarning className="text-5xl text-red-500" />
          <h2 className="m-0 text-lg font-semibold text-gray-700">
            Ödeme İşlemi Başarısız
          </h2>
          <p className="m-0 text-sm text-gray-600">{errorMessage}</p>
          <Button
            onClick={handleClosePopupWithClearStates}
            variant="destructive"
            className="mt-2"
          >
            Kapat
          </Button>
        </div>,
      )}

      <form
        id="credit-card-form"
        name="credit-card-form"
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-8 shadow-lg"
        autoComplete="off"
      >
        <Controller
          name="creditCardNumber"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <CreditCardInput
              disabled={loading}
              onChange={onChange}
              className="h-12 rounded-sm"
              error={!!error}
              errorMessage={error?.message}
              autoComplete="cc-number"
            />
          )}
        />
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-start">
          <Controller
            name="creditCardName"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <TextField
                disabled={loading}
                id="creditCardName"
                fullWidth
                className="h-12 rounded-sm"
                label="İsim Soyisim"
                placeholder="Lütfen kart üzerindeki ismi soyismi giriniz"
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                icon={<User className="text-xl" />}
                autoComplete="cc-name"
              />
            )}
          />
          <Controller
            name="creditCardDate"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <CreditCardDateInput
                error={!!error}
                errorMessage={error?.message}
                onChange={(e, val) => onChange(val)}
                disabled={loading}
                className="h-12 rounded-sm"
                autoComplete="cc-exp"
              />
            )}
          />
          <Controller
            name="creditCardCvv"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <TextField
                disabled={loading}
                label="CVV"
                placeholder="123"
                id="creditCardCvv"
                className="h-12 rounded-sm"
                maxLength={3}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  onChange(inputValue);
                }}
                error={!!error}
                errorMessage={error?.message}
                icon={<Code className="text-xl" />}
                autoComplete="cc-csc"
              />
            )}
          />
        </div>
      </form>

      {base64PasswordHtml && (
        <Modal open={true}>
          <iframe
            src={`data:text/html;base64,${base64PasswordHtml}`}
            className={clsx(
              "flex h-full min-h-[400px] w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
            )}
            onLoad={() => {
              const iframeWindow =
                document?.querySelector("iframe")?.contentWindow;
              if (iframeWindow) {
                iframeWindow.postMessage("check-status", "*");
              }
            }}
            title="3D Secure Payment"
            sandbox="allow-forms allow-scripts allow-same-origin"
          />
        </Modal>
      )}
    </>
  );
};

export default CreditCardForm;
