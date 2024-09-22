"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, startTransition } from "react";
import toast from "react-hot-toast";
import { useProgress } from "react-transition-progress";

const SocialCallback = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const startProgress = useProgress();
  const result = searchParams.get("result");

  useEffect(() => {
    if (result === "success") {
      startTransition(() => {
        startProgress();
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
      });
    }
  }, [result]);

  return null;
};

export default SocialCallback;
