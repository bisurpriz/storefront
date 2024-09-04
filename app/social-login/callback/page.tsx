"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SocialCallback = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const result = searchParams.get("result");

  useEffect(() => {
    if (result === "success") {
      toast.success("Giriş başarılı", {
        position: "bottom-right",
        ariaProps: {
          "aria-live": "polite",
          role: "status",
        },
        id: "login-success",
        duration: 1500,
      });

      replace("/");
    }
  }, [result]);

  return null;
};

export default SocialCallback;
