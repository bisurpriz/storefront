interface DropdownOption {
  value: string;
  label: string | React.ReactNode;
  searchValue?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  dropdownPlacement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight";
  isSearchable?: boolean;
  label?: string;
  noOptionsMessage?: string;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}
