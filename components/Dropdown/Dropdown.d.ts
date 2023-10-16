interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  dropdownPlacement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight";
  isSearchable?: boolean;
  label?: string;
  noOptionsMessage?: string;
  fullWidth?: boolean;
}
