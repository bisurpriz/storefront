import { toast } from "@/hooks/use-toast";

export const useErrorMessage = () => {
  const showToast = (message: string) => {
    toast({
      title: message,
      variant: "destructive",
      duration: 5000,
    });
  };

  return { showToast };
};
