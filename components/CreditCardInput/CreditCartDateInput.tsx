import React, { useState } from "react";
import TextField from "../TextField";

const CreditCardDateInput = ({
  onChange,
  ...props
}: Partial<TextFieldProps>) => {
  const [expiryDate, setExpiryDate] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    const formattedDate = inputValue.replace(/^(\d{2})/, "$1/").slice(0, 5);

    if (onChange) {
      setExpiryDate(formattedDate);
      onChange(e, formattedDate);
    }
  };

  return (
    <div>
      <TextField
        label="Son Kullanma Tarihi"
        type="text"
        id="expiryDate"
        value={expiryDate}
        onChange={handleInputChange}
        maxLength={5}
        placeholder="MM/YY"
        {...props}
      />
    </div>
  );
};

export default CreditCardDateInput;
