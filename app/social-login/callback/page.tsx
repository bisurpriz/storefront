"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect } from "react";
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
        toast({
          title: "Giriş başarılı",
          duration: 1500,
        });

        replace("/");
      });
    }
  }, [result]);

  return null;
};

export default SocialCallback;
