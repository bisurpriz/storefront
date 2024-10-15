import useResponsive from "@/hooks/useResponsive";
import { toast } from "sonner";

export const useErrorMessage = () => {
  const { isDesktop } = useResponsive();

  const showToast = (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: isDesktop ? "top-right" : "bottom-center",
      id: "error-toast",
    });
  };

  return { showToast };
};
