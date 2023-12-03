import React, { ChangeEvent, useState } from "react";
import TextField from "../TextField";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, inputValue: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  onChange,
  placeholder,
  value,
  label,
  className,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(() => value || "");
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputPhoneNumber = event.target.value;

    // Sadece sayıları al
    inputPhoneNumber = inputPhoneNumber.replace(/\D/g, "");

    // Telefon numarasını formatla (XXX) XXX-XXXX

    const trRegex =
      /^(?:\+90.?5|0090.?5|905|0?5)(?:[01345][0-9])\s?(?:[0-9]{3})\s?(?:[0-9]{2})\s?(?:[0-9]{2})$/;
    // /^(\d{0,3})(\d{0,3})(\d{0,4})$/
    const match = inputPhoneNumber.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (trRegex.test(inputPhoneNumber)) {
      setError("");
    } else {
      setError("Lütfen geçerli bir telefon numarası giriniz.");
    }

    if (match) {
      let formattedNumber;

      if (match[1] && match[2] && match[3]) {
        formattedNumber = `(${match[1]}) ${match[2]}-${match[3]}`;
      }

      if (match[1] && match[2] && !match[3]) {
        formattedNumber = `(${match[1]}) ${match[2]}`;
      }

      if (match[1] && !match[2] && !match[3]) {
        formattedNumber = `(${match[1]}`;
      }

      if (!match[1] && !match[2] && !match[3]) {
        formattedNumber = ``;
      }

      setPhoneNumber(formattedNumber);
      onChange && onChange(formattedNumber, match.input);
    } else {
      setPhoneNumber("");
    }
  };

  return (
    <TextField
      type="text"
      placeholder={placeholder ?? "(555) 555-5555"}
      value={phoneNumber}
      onChange={handleChange}
      label={label}
      error={!!error}
      className={className}
    />
  );
};

export default PhoneInput;
