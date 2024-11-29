"use client";

import { CookieTokens } from "@/app/@auth/contants";
import { getIpAddress } from "@/app/actions";
import {
  getConversationId,
  initialize3dsPayment,
} from "@/app/iyzico-payment/actions";
import {
  Initialize3dsPaymentRequest,
  Locale,
} from "@/app/iyzico-payment/types";
import { createBasketItems } from "@/app/iyzico-payment/utils";
import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCardDateInput";
import Code from "@/components/Icons/Code";
import Report from "@/components/Icons/Report";
import User from "@/components/Icons/User";
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
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProgress } from "react-transition-progress";
import { toast } from "sonner";
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

const schema = object().shape({
  creditCardNumber: string().test(
    "test-number",
    "Geçersiz kart numarası",
    (value) => {
      if (value) {
        if (value.startsWith("34") || value.startsWith("37")) {
          return value.replace(/\s+/g, "").length === 15;
        }

        return value.replace(/\s+/g, "").length === 16;
      } else {
        return false;
      }
    },
  ),
  creditCardName: string().required("Kart üzerindeki isim zorunludur"),
  creditCardDate: string()
    .required("Son kullanma tarihi geçersiz")
    .test("test-date", "Geçersiz tarih", (value) => {
      const splitted = value?.split("/");
      if (splitted) {
        const month = splitted[0];
        const year = splitted[1];
        if (month && year) {
          const currentYear = new Date().getFullYear().toString().slice(2);
          if (Number(year) < Number(currentYear)) {
            return false;
          }
          if (Number(month) > 12 || Number(month) < 1) {
            return false;
          }
          return true;
        }
      }
    }),
  creditCardCvv: string()
    .required("CVV zorunludur")
    .test("test-cvv", "Geçersiz CVV", (value) => {
      if (value) {
        return value.replace(/\s+/g, "").length === 3;
      } else {
        return false;
      }
    }),
});

const defaultValues: CreditCardForm = {
  creditCardNumber: "",
  creditCardName: "",
  creditCardDate: "",
  creditCardCvv: "",
};

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
  const {
    cartState: { cartItems, cost },
    hasCustomizableProduct,
    clearCart,
  } = useCart();

  const { handleSubmit, control, getValues } = useForm({
    defaultValues,
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
      }
    });
  }, []);
  const { openApproveContract, approveContract, setApproveContract } =
    useContract();

  const onSubmit = async (data: CreditCardForm) => {
    startTransition(async () => {
      if (!approveContract) {
        openApproveContract();
        return;
      }

      startProgress();
      if (data) {
        setLoading(true);
        const serialize = sessionStorage.getItem("order-detail-form");
        const detailData: OrderDetailFormData = JSON.parse(serialize);
        const senderNames = detailData.sender_name.split(" ");
        const timeStamps = new Date().getTime();

        const conversationId = await getConversationId(timeStamps);

        const basketId = `${
          userData.user?.carts[0]?.id ?? Cookies.get(CookieTokens.GUEST_ID)
        }-${timeStamps}`;
        const ip = await getIpAddress();

        if (!ip) {
          toast.error("IP Adresi alınamadı. Lütfen tekrar deneyiniz.");
        }

        const isCouponApplied = cost.isCouponApplied;

        const couponInfo = isCouponApplied
          ? {
              code: cost.couponCode,
              guest_id: Cookies.get(CookieTokens.GUEST_ID) ?? undefined,
            }
          : undefined;

        const variables = {
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
            ip: await getIpAddress(),
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
            cardNumber: data.creditCardNumber.replaceAll(" ", ""),
            cvc: data.creditCardCvv,
            expireMonth: data.creditCardDate.split("/")[0],
            expireYear: `20${data.creditCardDate.split("/")[1]}`,
          },
          installment: 1,
        } as Initialize3dsPaymentRequest;

        const res = await createOrderAction(
          cartItems,
          detailData,
          conversationId,
          couponInfo,
        );

        if (res?.data?.insert_order_one?.id) {
          setCreatedOrder(res.data.insert_order_one.id);
        }
        if (res.status === "error") {
          setLoading(false);
          openPopup();
          setErrorMessage(
            "Şuan sipariş oluşturamıyoruz. Lütfen daha sonra tekrar deneyiniz.",
          );
          return;
        } else {
          const response = await initialize3dsPayment(variables);
          if (response.errorMessage) {
            setLoading(false);
            openPopup();
            setErrorMessage(response.errorMessage);
            return;
          }

          setBase64PasswordHtml(response.threeDSHtmlContent);
        }
      }
    });
  };

  const { renderPopup, openPopup, closePopup } = usePopup();

  const removeStorages = () => {
    sessionStorage.removeItem("order-detail-form");
    localStorage.removeItem("order-detail-form");
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("cost");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_HOST) return;

      if (event.data === "success") {
        setLoading(false);
        clearCart();
        removeStorages();
        if (hasCustomizableProduct)
          replace(CartStepPaths.CUSTOMIZE + "/" + createdOrder);
        else replace(CartStepPaths.COMPLETE);
      } else if (event.data.errorMessage) {
        setLoading(false);
        setErrorMessage(event.data.errorMessage);
        openPopup();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [createdOrder]);

  const handleClosePopupWithClearStates = () => {
    setBase64PasswordHtml("");
    setErrorMessage("");
    closePopup();
  };

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
          <Report className="text-5xl text-red-500" />
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
              />
            )}
          />
        </div>
      </form>
      <Modal open={!!base64PasswordHtml}>
        <iframe
          src={`data:text/html;base64,${base64PasswordHtml}`}
          className={clsx(
            "flex h-full min-h-[400px] w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg",
          )}
          onLoad={() => {
            const iframeWindow =
              document?.querySelector("iframe").contentWindow;
            iframeWindow.postMessage("check-status", "*");
          }}
        />
      </Modal>
    </>
  );
};

export default CreditCardForm;
