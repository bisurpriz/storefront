"use client";

import { useEffect } from "react";
import Button, { ButtonProps } from ".";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      toast.loading("İşlem yapılıyor...", {
        id: "submit-button",
      });
    } else {
      toast.dismiss("submit-button");
    }
  }, [pending]);

  return <Button {...props} type="submit" loading={pending} />;
};

export default SubmitButton;
