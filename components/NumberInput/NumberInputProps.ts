import { NumberInputProps as MuiProps } from "@mui/base/Unstable_NumberInput";
import { ButtonProps } from "../Button";

export interface NumberInputProps extends MuiProps {
  color?: ButtonProps["color"];
}
