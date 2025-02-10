"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { MessageCircleWarning } from "lucide-react";

interface PaymentErrorProps {
  errorMessage: string;
  onClose: () => void;
}

export const PaymentError = ({ errorMessage, onClose }: PaymentErrorProps) => {
  return (
    <div
      className={clsx(
        "w-full max-w-screen-sm rounded-lg bg-white p-4",
        "flex flex-col items-center justify-center gap-2",
        "text-center",
      )}
    >
      <MessageCircleWarning className="text-5xl text-destructive" />
      <h2 className="m-0 text-lg font-semibold text-foreground">
        Ödeme İşlemi Başarısız
      </h2>
      <p className="m-0 text-sm capitalize text-muted-foreground">
        {errorMessage}
      </p>
      <Button onClick={onClose} variant="destructive" className="mt-2">
        Kapat
      </Button>
    </div>
  );
};
