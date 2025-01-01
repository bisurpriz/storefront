"use client";

import CreditCardInput from "@/components/CreditCardInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCardDateInput";
import TextField from "@/components/TextField";
import usePopup from "@/hooks/usePopup";
import useResponsive from "@/hooks/useResponsive";
import { yupResolver } from "@hookform/resolvers/yup";
import { Code, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProgress } from "react-transition-progress";
import { CartStepPaths } from "../../constants";
import { usePayment } from "../../hooks/usePayment";
import { PaymentError } from "./PaymentError";
import { SecurePaymentFrame } from "./SecurePaymentFrame";
import { CreditCardForm, creditCardSchema } from "./validation";

const CreditCardFormComponent = () => {
  const { isTablet } = useResponsive();
  const { renderPopup, openPopup, closePopup } = usePopup();
  const { replace } = useRouter();
  const startProgress = useProgress();
  const { loading, errorMessage, base64Html, handlePayment, resetError } =
    usePayment();

  const schema = useMemo(() => creditCardSchema, []);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<CreditCardForm>({
    defaultValues: {
      creditCardNumber: "",
      creditCardName: "",
      creditCardDate: "",
      creditCardCvv: "",
    } as CreditCardForm,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
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
  }, [replace, startProgress]);

  useEffect(() => {
    if (errorMessage) {
      openPopup();
    }
  }, [errorMessage, openPopup]);

  return (
    <>
      {renderPopup(
        <PaymentError
          errorMessage={errorMessage}
          onClose={() => {
            resetError();
            closePopup();
          }}
        />,
      )}

      <form
        id="credit-card-form"
        name="credit-card-form"
        onSubmit={handleSubmit((data) => handlePayment(data, isTablet))}
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

      {base64Html && <SecurePaymentFrame base64Content={base64Html} />}
    </>
  );
};

export default CreditCardFormComponent;
