import { Code } from "lucide-react";
import React, { useState } from "react";
import TextField from "../TextField";

interface CreditCardCvvInputProps extends Partial<TextFieldProps> {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | null,
    value: string,
  ) => void;
  error?: boolean;
  errorMessage?: string;
  cardType?: "amex" | "other";
}

const CreditCardCvvInput: React.FC<CreditCardCvvInputProps> = ({
  onChange,
  error,
  errorMessage,
  cardType = "other",
  ...props
}) => {
  const [cvv, setCvv] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  // Get max length based on card type (Amex: 4 digits, others: 3 digits)
  const maxLength = cardType === "amex" ? 4 : 3;

  // Validate CVV
  const validateCvv = (value: string): boolean => {
    // If empty, consider it valid (for UX purposes)
    if (!value) return true;

    // Check if CVV contains only digits
    if (!/^\d+$/.test(value)) {
      setValidationMessage("CVV sadece rakamlardan oluşmalıdır");
      return false;
    }

    // Check length based on card type
    if (value.length < maxLength) {
      setValidationMessage(`CVV ${maxLength} haneli olmalıdır`);
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-numeric characters
    value = value.replace(/\D/g, "");

    // Limit to max length
    if (value.length <= maxLength) {
      setCvv(value);

      // Validate if we have a complete CVV
      if (value.length === maxLength) {
        const valid = validateCvv(value);
        setIsValid(valid);
      } else {
        setIsValid(true);
        setValidationMessage("");
      }

      onChange(e, value);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <TextField
        label="CVV"
        id="creditCardCvv"
        type="text"
        icon={<Code className="text-xl" />}
        value={cvv}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={cardType === "amex" ? "1234" : "123"}
        error={error || !isValid}
        errorMessage={errorMessage || validationMessage}
        autoComplete="cc-csc"
        {...props}
      />
    </div>
  );
};

export default CreditCardCvvInput;
