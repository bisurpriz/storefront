"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../@auth/(.)login/components/LoginForm";
import { useTransition } from "react";
import { useProgress } from "react-transition-progress";

export type LoginResponse = {
  data: {
    login: {
      error: string;
      refresh_token: string | null;
      access_token: string | null;
    };
  };
};

const LoginPage = () => {
  const { replace } = useRouter();
  const [, startTransition] = useTransition();
  const startProgress = useProgress();
  return (
    <LoginForm
      onSuccessfulLogin={(status) => {
        startTransition(() => {
          startProgress();
          if (status) {
            replace("/");
          }
        });
      }}
    />
  );
};

export default LoginPage;
