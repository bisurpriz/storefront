import React, { useEffect, useState } from "react";
import RadioButton from ".";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  className?: string;
  value: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  className,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e, value: string) => {
    setSelectedValue(value);
    onChange(e, value);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className={className}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          name={name}
          checked={selectedValue === option.value}
          onChange={(value) => handleChange(value, option.value)}
          className="mb-2"
        />
      ))}
    </div>
  );
};

export default RadioGroup;
