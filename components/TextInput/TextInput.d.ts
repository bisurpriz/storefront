interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  id: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: "text" | "password" | "email" | "number";
  maxLength?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactElement;
  successIcon?: React.ReactElement;
  value?: string;
  defaultValue?: string;
}
