import React, { useState } from "react";
import TextField from "../TextField";
import Calendar from "../Icons/Calendar";

const CreditCardDateInput = ({
  onChange,
  ...props
}: Partial<TextFieldProps>) => {
  const [expiryDate, setExpiryDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9/]/g, "");

    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }

    if (value.length <= 5) {
      setExpiryDate(value);
      onChange(e, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Backspace" && expiryDate.length === 3) {
      setExpiryDate(expiryDate.slice(0, 1));
      onChange(null, expiryDate.slice(0, 1));
    }
  };

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
        {...props}
      />
    </div>
  );
};

export default CreditCardDateInput;
