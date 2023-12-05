import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import AnimatedProfileHeader from "./Animated";

const HeaderProfile = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleLogin = () => {
    router.push(`/api/auth/login`);
  };

  return !user ? (
    <div className="flex items-center justify-end ml-2">
      <Button
        type="button"
        onClick={handleLogin}
        size="small"
        label="Giriş Yap"
        loading={isLoading}
      />
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse">
      <AnimatedProfileHeader />
    </div>
  );
};

export default HeaderProfile;
