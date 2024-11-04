import clsx from "clsx";
import { FC } from "react";
import { Textarea as ShaCdnTextArea } from "../ui/textarea";
import { Label } from "../ui/label";

type TextareaProps = {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, val: string) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  defaultValue?: string;
  inputClass?: string;
};

const Textarea: FC<TextareaProps> = ({
  disabled,
  error,
  errorMessage,
  fullWidth,
  id,
  label,
  onChange,
  placeholder,
  value,
  className,
  rows = 3,
  inputClass,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e, e.target.value);
  };

  return (
    <div className={clsx("inline-block text-xs w-full", className)}>
      <Label
        htmlFor={id}
        className={clsx(error ? "text-red-500" : "text-gray-700")}
      >
        {label}
      </Label>
      <ShaCdnTextArea
        id={id}
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        className={inputClass}
        variant={error ? "error" : "default"}
        {...rest}
      />
      {error && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default Textarea;
