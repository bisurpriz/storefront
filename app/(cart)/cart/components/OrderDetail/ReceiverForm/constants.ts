import { StepData } from "./types";

export const STEPPER_DATA: StepData[] = [
  { label: "Gönderici", key: "sender" },
  { label: "Alıcı", key: "receiver" },
] as const;

export const MOTION_VARIANTS = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
} as const;
