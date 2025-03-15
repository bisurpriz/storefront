"use client";

import CreditCardInput from "@/components/CreditCardInput";
import CreditCardCvvInput from "@/components/CreditCardInput/CreditCardCvvInput";
import CreditCardDateInput from "@/components/CreditCardInput/CreditCardDateInput";
import TextField from "@/components/TextField";
import usePopup from "@/hooks/usePopup";
import useResponsive from "@/hooks/useResponsive";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useProgress } from "react-transition-progress";
import { CartStepPaths } from "../../constants";
import { usePayment } from "../../hooks/usePayment";
import { PaymentError } from "./PaymentError";
import { SecurePaymentFrame } from "./SecurePaymentFrame";
import { CreditCardForm, creditCardSchema } from "./validation";

// Memoized form input components to prevent unnecessary re-renders
const MemoizedCreditCardInput = memo(CreditCardInput);
const MemoizedTextField = memo(TextField);
const MemoizedCreditCardDateInput = memo(CreditCardDateInput);
const MemoizedCreditCardCvvInput = memo(CreditCardCvvInput);
const MemoizedPaymentError = memo(PaymentError);
const MemoizedSecurePaymentFrame = memo(SecurePaymentFrame);

const CreditCardFormComponent = () => {
  const { isTablet } = useResponsive();
  const { renderPopup, openPopup, closePopup } = usePopup();
  const { replace } = useRouter();
  const startProgress = useProgress();
  const { loading, errorMessage, base64Html, handlePayment, resetError } =
    usePayment();
  const [cardType, setCardType] = useState<"amex" | "other">("other");

  // Memoize form configuration to prevent re-creation on each render
  const formConfig = useMemo(
    () => ({
      defaultValues: {
        creditCardNumber: "",
        creditCardName: "",
        creditCardDate: "",
        creditCardCvv: "",
      } as CreditCardForm,
      resolver: yupResolver(creditCardSchema),
      mode: "onChange" as const,
    }),
    [],
  );

  const { handleSubmit, control, watch } = useForm<CreditCardForm>(formConfig);

  // Watch credit card number to detect card type - use memoized selector to prevent unnecessary re-renders
  const creditCardNumber = watch("creditCardNumber");

  // Detect card type based on credit card number
  useEffect(() => {
    if (!creditCardNumber) {
      setCardType("other");
      return;
    }

    const cleanNumber = creditCardNumber.replace(/\s+/g, "");
    // American Express cards start with 34 or 37
    if (cleanNumber.startsWith("34") || cleanNumber.startsWith("37")) {
      setCardType("amex");
    } else {
      setCardType("other");
    }
  }, [creditCardNumber]);

  // Memoize the checkOrderDetails function to prevent recreation on each render
  const checkOrderDetails = useCallback(async () => {
    startTransition(() => {
      startProgress();
    });
    try {
      const orderDetails = sessionStorage.getItem("order-detail-form");
      if (!orderDetails) throw new Error("Order details not found");
      JSON.parse(orderDetails);
    } catch {
      sessionStorage.removeItem("order-detail-form");
      replace(CartStepPaths.CART);
    }
  }, [replace, startProgress]);

  // Use useEffect with empty dependency array for initial check only
  useEffect(() => {
    checkOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorMessage) {
      openPopup();
    }
  }, [errorMessage, openPopup]);

  const onSubmit = useCallback(
    async (data: CreditCardForm) => {
      await handlePayment(data, isTablet);
    },
    [handlePayment, isTablet],
  );

  const handleCloseError = useCallback(() => {
    resetError();
    closePopup();
  }, [resetError, closePopup]);

  // Memoize the error component to prevent recreation on each render
  const errorComponent = useMemo(
    () => (
      <MemoizedPaymentError
        errorMessage={errorMessage}
        onClose={handleCloseError}
      />
    ),
    [errorMessage, handleCloseError],
  );

  // Memoize form controllers to prevent unnecessary re-renders
  const creditCardNumberField = useMemo(
    () => (
      <Controller
        name="creditCardNumber"
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <MemoizedCreditCardInput
            disabled={loading}
            onChange={onChange}
            className="h-12 rounded-sm"
            error={!!error}
            errorMessage={error?.message}
            autoComplete="cc-number"
          />
        )}
      />
    ),
    [control, loading],
  );

  const formFields = useMemo(
    () => (
      <div className="flex flex-col w-full gap-4 md:flex-row md:items-start md:justify-start">
        <Controller
          name="creditCardName"
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <MemoizedTextField
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
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="creditCardDate"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <MemoizedCreditCardDateInput
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
              <MemoizedCreditCardCvvInput
                disabled={loading}
                className="h-12 rounded-sm"
                onChange={(e, value) => {
                  onChange(value);
                }}
                error={!!error}
                errorMessage={error?.message}
                cardType={cardType}
              />
            )}
          />
        </div>
      </div>
    ),
    [control, loading, cardType],
  );

  const secureFrame = useMemo(
    () =>
      base64Html && <MemoizedSecurePaymentFrame base64Content={base64Html} />,
    [base64Html],
  );

  return (
    <>
      {renderPopup(errorComponent)}

      <form
        id="credit-card-form"
        name="credit-card-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        {creditCardNumberField}
        {formFields}
      </form>

      {secureFrame}
    </>
  );
};

// Export a memoized version of the component to prevent unnecessary re-renders from parent components
export default memo(CreditCardFormComponent);
