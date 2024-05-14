"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../@auth/(.)login/components/LoginForm";

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
  return (
    <LoginForm
      onSuccessfulLogin={(status) => {
        if (status) {
          replace("/");
        }
      }}
    />
  );
};

export default LoginPage;
