import { checkBin } from "@/app/iyzico-payment/actions";
import { CardAssociation } from "@/app/iyzico-payment/types";
import { getCardAssociationImageUrl } from "@/utils/getImageUrl";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import TextField from "../TextField";

// Credit card types and their regex patterns
const CARD_TYPES = {
  VISA: /^4/,
  MASTERCARD: /^5[1-5]/,
  AMEX: /^3[47]/,
  DISCOVER: /^6(?:011|5)/,
  TROY: /^9(?:792)/,
  DINERS: /^3(?:0[0-5]|[68])/,
  JCB: /^(?:2131|1800|35)/,
} as const;

// Define types
interface CreditCardInputProps extends Partial<TextFieldProps> {
  onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

interface CardValidation {
  isValid: boolean;
  error?: string;
}

const CreditCardInput = ({
  onChange,
  onValidationChange,
  ...props
}: CreditCardInputProps) => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardTypeImage, setCardTypeImage] = useState("");
  const [validation, setValidation] = useState<CardValidation>({
    isValid: true,
  });
  const [isFocused, setIsFocused] = useState(false);

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true);

  // Validate credit card using Luhn algorithm
  const validateCreditCard = useCallback((number: string): CardValidation => {
    // Early return for empty input
    if (!number || number.trim() === "") {
      return { isValid: true };
    }

    const digitsOnly = number.replace(/\D/g, "");

    // Check if card number has valid length
    if (digitsOnly.length < 13 || digitsOnly.length > 19) {
      return {
        isValid: false,
        error:
          digitsOnly.length < 13
            ? "Kart numarası çok kısa"
            : "Kart numarası çok uzun",
      };
    }

    // Luhn algorithm implementation
    let sum = 0;
    let shouldDouble = false;

    // Loop through values starting from the rightmost digit
    for (let i = digitsOnly.length - 1; i >= 0; i--) {
      let digit = parseInt(digitsOnly.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;
    return {
      isValid: isValid || digitsOnly.length < 16, // Only validate fully entered cards
      error:
        !isValid && digitsOnly.length >= 16
          ? "Geçersiz kart numarası"
          : undefined,
    };
  }, []);

  // Format credit card number with spaces
  const formatCreditCardNumber = useCallback((number: string): string => {
    const digitsOnly = number.replace(/\D/g, "");

    // Format based on card type
    if (CARD_TYPES.AMEX.test(digitsOnly)) {
      // AMEX format: XXXX XXXXXX XXXXX
      return digitsOnly
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ")
        .trim();
    }

    // Default format: XXXX XXXX XXXX XXXX
    return digitsOnly
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  }, []);

  // Detect card type based on first digits
  const detectCardType = useCallback(
    (number: string): CardAssociation | null => {
      const digitsOnly = number.replace(/\D/g, "");

      if (!digitsOnly) return null;

      if (CARD_TYPES.VISA.test(digitsOnly)) return "VISA";
      if (CARD_TYPES.MASTERCARD.test(digitsOnly)) return "MASTER_CARD";
      if (CARD_TYPES.AMEX.test(digitsOnly)) return "AMERICAN_EXPRESS";
      if (CARD_TYPES.TROY.test(digitsOnly)) return "TROY";

      return null;
    },
    [],
  );

  // Debounced BIN check
  const debouncedBinCheck = useDebouncedCallback(async (number: string) => {
    if (!isMounted.current) return;

    const digitsOnly = number.replace(/\D/g, "");

    try {
      if (digitsOnly.length >= 6) {
        // First try to detect card type locally
        const detectedType = detectCardType(digitsOnly);

        if (detectedType) {
          setCardTypeImage(getCardAssociationImageUrl(detectedType));
        } else {
          // If local detection fails, check with API
          const { cardAssociation } = await checkBin({
            binNumber: digitsOnly.slice(0, 6),
          });

          if (cardAssociation && isMounted.current) {
            setCardTypeImage(getCardAssociationImageUrl(cardAssociation));
          }
        }
      } else {
        setCardTypeImage("");
      }
    } catch (error) {
      console.error("Error checking BIN:", error);
      // Don't clear the card type if we already detected it locally
      if (!cardTypeImage) {
        setCardTypeImage("");
      }
    }
  }, 600);

  // Handle input change
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const digitsOnly = value.replace(/\D/g, "");

      // Limit to 19 digits (16 digits + 3 spaces for most cards)
      if (digitsOnly.length > 19) return;

      const formattedValue = formatCreditCardNumber(digitsOnly);
      setCreditCardNumber(formattedValue);

      // Validate the card
      const validationResult = validateCreditCard(digitsOnly);
      setValidation(validationResult);

      // Notify parent about validation state
      onValidationChange?.(validationResult.isValid);

      // Check BIN after a delay
      debouncedBinCheck(digitsOnly);

      // Call the original onChange handler
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent, formattedValue);
      }
    },
    [
      onChange,
      onValidationChange,
      formatCreditCardNumber,
      validateCreditCard,
      debouncedBinCheck,
    ],
  );

  // Handle focus events
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    // Validate on blur for better UX
    const digitsOnly = creditCardNumber.replace(/\D/g, "");
    if (digitsOnly.length > 0) {
      const validationResult = validateCreditCard(digitsOnly);
      setValidation(validationResult);
      onValidationChange?.(validationResult.isValid);
    }
  }, [creditCardNumber, validateCreditCard, onValidationChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      debouncedBinCheck.cancel();
    };
  }, [debouncedBinCheck]);

  return (
    <TextField
      type="text"
      id="creditCardNumber"
      value={creditCardNumber}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      maxLength={19}
      placeholder="Lütfen kart numaranızı giriniz"
      icon={
        cardTypeImage ? (
          <Image width={24} height={16} src={cardTypeImage} alt="card type" />
        ) : (
          <CreditCard className="text-xl" />
        )
      }
      fullWidth
      label="Kart Numarası"
      error={!validation.isValid && !isFocused}
      errorMessage={validation.error}
      {...props}
    />
  );
};

export default CreditCardInput;
