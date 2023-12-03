interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  error?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  id?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  icon?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
