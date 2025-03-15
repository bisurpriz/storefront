import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import TextField from "../TextField";

interface CreditCardDateInputProps extends Partial<TextFieldProps> {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | null,
    value: string,
  ) => void;
  error?: boolean;
  errorMessage?: string;
}

const CreditCardDateInput: React.FC<CreditCardDateInputProps> = ({
  onChange,
  error,
  errorMessage,
  ...props
}) => {
  const [expiryDate, setExpiryDate] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  // Validate the expiry date
  const validateExpiryDate = (value: string): boolean => {
    // If empty, consider it valid (for UX purposes)
    if (!value || value.length < 5) return true;

    const [month, year] = value.split("/");

    // Check if month is between 01-12
    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      setValidationMessage("Ay değeri 01-12 arasında olmalıdır");
      return false;
    }

    // Check if year is valid (current year or future)
    const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
    const yearNum = parseInt(year, 10);

    if (isNaN(yearNum)) {
      setValidationMessage("Geçersiz yıl");
      return false;
    }

    if (yearNum < currentYear) {
      setValidationMessage("Kartınızın süresi dolmuş");
      return false;
    }

    // If current year, check if month is current or future
    if (yearNum === currentYear) {
      const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed
      if (monthNum < currentMonth) {
        setValidationMessage("Kartınızın süresi dolmuş");
        return false;
      }
    }

    setValidationMessage("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-numeric characters except for the slash
    value = value.replace(/[^0-9/]/g, "");

    // Format as MM/YY
    if (value.length > 0) {
      // Extract digits only
      const digits = value.replace(/\D/g, "");

      if (digits.length > 0) {
        // Handle month part (first two digits)
        let month = digits.substring(0, 2);

        // Auto-correct month if needed
        if (month.length === 1 && parseInt(month, 10) > 1) {
          month = "0" + month;
        } else if (month.length === 2) {
          const monthNum = parseInt(month, 10);
          if (monthNum > 12) {
            month = "12";
          } else if (monthNum === 0) {
            month = "01";
          }
        }

        // Format with slash
        if (digits.length <= 2) {
          value = month;
        } else {
          const year = digits.substring(2, 4);
          value = `${month}/${year}`;
        }
      }
    }

    // Automatically add slash after month
    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }

    // Limit to MM/YY format (5 characters)
    if (value.length <= 5) {
      setExpiryDate(value);

      // Validate only if we have a complete date
      if (value.length === 5) {
        const valid = validateExpiryDate(value);
        setIsValid(valid);
      } else {
        setIsValid(true);
        setValidationMessage("");
      }

      onChange(e, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    // Handle backspace when deleting the slash
    if (key === "Backspace" && expiryDate.length === 3) {
      const newValue = expiryDate.slice(0, 2);
      setExpiryDate(newValue);
      onChange(null, newValue);
    }
  };

  // Validate on mount and when expiryDate changes
  useEffect(() => {
    if (expiryDate.length === 5) {
      validateExpiryDate(expiryDate);
    }
  }, [expiryDate]);

  return (
    <div className="flex flex-col items-start">
      <TextField
        label="Son Kullanma Tarihi"
        id="creditCardDate"
        type="text"
        icon={<Calendar className="text-xl" />}
        value={expiryDate}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={5}
        placeholder="MM/YY"
        error={error || !isValid}
        errorMessage={errorMessage || validationMessage}
        {...props}
      />
    </div>
  );
};

export default CreditCardDateInput;
