"use client";

import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCardDateInput";
import TextField from "@/components/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { LuCode, LuUser } from "react-icons/lu";
import { initialize3dsPayment } from "@/app/iyzico-payment/actions";
import { useUser } from "@/contexts/AuthContext";
import { OrderDetailPartialFormData } from "../OrderDetail/ReceiverForm";
import { getIpAddress } from "@/app/actions";
import useResponsive from "@/hooks/useResponsive";
import { CookieTokens } from "@/app/@auth/contants";
import Cookies from "js-cookie";
import { randomBytes } from "crypto";
import {
  Initialize3dsPaymentRequest,
  Locale,
} from "@/app/iyzico-payment/types";
import clsx from "clsx";
import usePopup from "@/hooks/usePopup";
import Button from "@/components/Button";
import { MdReportGmailerrorred } from "react-icons/md";
import Modal from "@/components/Modal/FramerModal/Modal";
import { createPortal } from "react-dom";
import { createOrderAction } from "../../actions";

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
    }
  ),
  creditCardName: string().required("Kart üzerindeki isim zorunludur"),
  creditCardDate: string()
    .required()
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { push, replace } = useRouter();
  const userData = useUser();
  const { isDesktop } = useResponsive();
  const {
    cartState: { cartItems, cost },
    clearCart,
  } = useCart();

  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const serialize = localStorage.getItem("detail-data");
    if (!serialize) {
      push("/cart");
    }
  }, []);

  const onSubmit = async (data: CreditCardForm) => {
    if (data) {
      setLoading(true);
      const serialize = localStorage.getItem("detail-data");
      const detailData: OrderDetailPartialFormData = JSON.parse(serialize);
      const senderNames = detailData.sender_name.split(" ");
      const conversationId =
        userData.user?.carts[0].id ??
        Cookies.get(CookieTokens.GUEST_ID) + randomBytes(16).toString("hex");

      const basketId =
        userData.user?.carts[0].id ??
        Cookies.get(CookieTokens.GUEST_ID) + "-" + new Date().getTime();

      const variables = {
        basketId,
        basketItems: cartItems.map((product) => ({
          category1: product.category.name,
          category2: product.category.name,
          id: product.id.toString(),
          name: product.name,
          price:
            (product.discount_price * product.quantity)
              ?.toFixed(2)
              .toString() ||
            (product.price * product.quantity)?.toFixed(2).toString(),
          itemType: "PHYSICAL",
        })),
        billingAddress: {
          address: detailData.address,
          city: detailData.invoice_address,
          contactName: detailData.sender_name,
          country: "Türkiye",
        },
        shippingAddress: {
          address: detailData.address,
          city: detailData.city.id.toString(),
          country: "Türkiye",
          contactName: detailData.receiver_name,
        },
        buyer: {
          city: detailData.city.name,
          country: "Türkiye",
          email: detailData.sender_email,
          gsmNumber: detailData.sender_phone,
          identityNumber: "11111111111",
          ip: await getIpAddress(),
          name: senderNames[0],
          surname: senderNames[senderNames.length - 1],
          registrationAddress: detailData.address,
          id: userData?.user?.id ?? Cookies.get(CookieTokens.GUEST_ID),
        },
        paymentChannel: isDesktop ? "WEB" : "MOBILE_WEB",
        callbackUrl: process.env.NEXT_PUBLIC_IYZICO_CALLBACK_URL,
        conversationId,
        currency: "TRY",
        locale: Locale.TR,
        paidPrice: cost.toString(),
        price: cost.toString(),
        paymentCard: {
          cardHolderName: data.creditCardName,
          cardNumber: data.creditCardNumber.replaceAll(" ", ""),
          cvc: data.creditCardCvv,
          expireMonth: data.creditCardDate.split("/")[0],
          expireYear: `20${data.creditCardDate.split("/")[1]}`,
        },
        installment: 1,
      } as Initialize3dsPaymentRequest;
      const response = await initialize3dsPayment(variables);
      if (response.errorMessage) {
        setLoading(false);
        openPopup();
        setErrorMessage(response.errorMessage);
        return;
      }
      if (response) setBase64PasswordHtml(response.threeDSHtmlContent);
    }
  };

  const { renderPopup, openPopup, closePopup } = usePopup();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_HOST) return;
      const serialize = localStorage.getItem("detail-data");
      const detailData: OrderDetailPartialFormData = JSON.parse(serialize);

      if (event.data === "success") {
        const res = await createOrderAction(cartItems, detailData);
        if (res) {
          console.log("Order created successfully");
          clearCart();
          localStorage.removeItem("detail-data");
          localStorage.removeItem("cart");
          localStorage.removeItem("count");
          localStorage.removeItem("cost");
        }

        setLoading(false);
        replace("/cart/complete");
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
  }, []);

  const handleClosePopupWithClearStates = () => {
    setBase64PasswordHtml("");
    setErrorMessage("");
    closePopup();
  };

  return (
    <>
      {createPortal(
        renderPopup(
          <div
            className={clsx(
              "max-w-screen-sm w-full p-4 bg-white shadow-lg rounded-lg border border-gray-200",
              "flex flex-col justify-center items-center gap-2",
              "text-center"
            )}
          >
            <MdReportGmailerrorred size={48} className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800 m-0">
              Ödeme İşlemi Başarısız
            </h2>
            <p className="text-sm text-gray-600 m-0">{errorMessage}</p>
            <Button
              onClick={handleClosePopupWithClearStates}
              color="error"
              className="mt-2"
            >
              Kapat
            </Button>
          </div>
        ),
        document?.body
      )}

      <form
        id="credit-card-form"
        name="credit-card-form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative flex flex-col justify-center items-center px-4 py-8 bg-white shadow-lg rounded-lg border border-gray-200 gap-4"
      >
        <Controller
          name="creditCardNumber"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <CreditCardInput
              disabled={loading}
              onChange={onChange}
              error={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <div className="flex flex-col md:flex-row md:justify-start md:items-start w-full gap-4">
          <Controller
            name="creditCardName"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <TextField
                disabled={loading}
                id="creditCardName"
                fullWidth
                label="İsim Soyisim"
                placeholder="Lütfen kart üzerindeki ismi soyismi giriniz"
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                icon={<LuUser size={20} />}
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
                maxLength={3}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  onChange(inputValue);
                }}
                error={!!error}
                errorMessage={error?.message}
                icon={<LuCode size={20} />}
              />
            )}
          />
        </div>
      </form>
      <Modal open={!!base64PasswordHtml}>
        <iframe
          src={`data:text/html;base64,${base64PasswordHtml}`}
          className={clsx(
            "w-full h-full flex justify-center items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 min-h-[400px]"
          )}
          onLoad={() => {
            const iframeWindow = document.querySelector("iframe").contentWindow;
            iframeWindow.postMessage("check-status", "*");
          }}
        />
      </Modal>
    </>
  );
};

export default CreditCardForm;
