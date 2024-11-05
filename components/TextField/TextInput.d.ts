interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
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
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  icon?: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
  ref?: React.Ref<HTMLInputElement>;
  spellCheck?: boolean;
  readOnly?: boolean;
  dirtyAnimation?: boolean;
}
