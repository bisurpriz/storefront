"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";
import { toast } from "sonner";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      toast.loading("İşlem yapılıyor...", {
        id: "submit-button",
        position: "bottom-right",
      });
    } else {
      toast.dismiss("submit-button");
    }
  }, [pending]);

  return <Button {...props} type="submit" loading={pending} />;
};

export default SubmitButton;
