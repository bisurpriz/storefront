"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Link from "next/link";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../actions";
import { AuthErrorMessages } from "../../contants";
import { signIn } from "next-auth/react";
import clsx from "clsx";
import GoogleIcon from "@/components/CustomIcons/Google";
import Image from "next/image";
import Login from "@/components/Icons/Login";
import { IMAGE_URL } from "@/contants/urls";

type LoginFormProps = {
  onSuccessfulLogin?: (status: boolean) => void;
};

export const socialLogins = [
  {
    name: "Google",
    icon: <GoogleIcon />,
    signIn: () => signIn("google"),
    color: "bg-gray-100",
  },
];

const LoginForm: FC<LoginFormProps> = ({ onSuccessfulLogin }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClientLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const [email, password] = Array.from(event.currentTarget.elements).map(
      (field: HTMLInputElement) => field.value
    );

    const response = await login({ email, password });

    if (response.data.login.error) {
      const errorMessage =
        AuthErrorMessages[
          response.data.login.error as keyof typeof AuthErrorMessages
        ];

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",
        ariaProps: {
          "aria-live": "polite",
          role: "status",
        },
        id: "login-error",
        duration: 1500,
      });
      setLoading(false);
      return;
    }

    setError("");
    toast.success("Giriş başarılı", {
      position: "bottom-right",
      ariaProps: {
        "aria-live": "polite",
        role: "status",
      },
      id: "login-success",
      duration: 1500,
    });
    onSuccessfulLogin?.(true);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleClientLogin}
      className={clsx(
        "flex flex-col items-center justify-center rounded-lg p-12 m-auto gap-4 font-mono w-[500px] bg-white max-md:w-full max-md:h-full max-md:rounded-none"
      )}
    >
      <Image
        src={"/logo.svg"}
        width={300}
        height={300}
        alt="Login"
        className="w-auto h-auto"
      />
      <h1 className="text-3xl font-bold text-center">Giriş Yap</h1>
      <p className="text-center text-gray-500">
        Sipariş verebilmek, kampanyalardan faydalanabilmek ve daha fazlası için
        giriş yapın.
      </p>
      <div className="w-full flex flex-col gap-2">
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="Lütfen email adresinizi girin"
          fullWidth
          error={!!error}
        />
        <TextField
          id="password"
          label="Şifre"
          type="password"
          placeholder="Lütfen şifrenizi girin"
          fullWidth
          error={!!error}
        />
        {error && <p className="text-red-500 mr-auto text-sm">{error}</p>}
      </div>
      <Button
        type="submit"
        icon={<Login className="mr-2" />}
        label="Giriş Yap"
        loading={loading}
      />
      <p className="flex gap-2">
        Hesabınız yok mu?
        <Link href="/register" className="text-center text-blue-500" replace>
          Kayıt olun
        </Link>
      </p>
      <div className="flex flex-col gap-2 w-full justify-center items-center mt-4">
        {socialLogins.map(({ name, icon, signIn, color }) => (
          <span
            key={name}
            onClick={signIn}
            className={clsx(
              "flex items-center justify-start w-full rounded-lg cursor-pointer text-lg",
              "p-2 border border-gray-200",
              color,
              "hover:bg-opacity-80"
            )}
          >
            {icon}
            <span className="flex-1 text-center text-base">
              {name} ile giriş yap
            </span>
          </span>
        ))}
      </div>
      <span
        className="text-center text-gray-500 text-xs"
        style={{ maxWidth: "300px" }}
      >
        Sosyal medya hesaplarınızla daha hızlı ve kolay bir şekilde giriş
        yapabilirsiniz.
      </span>
    </form>
  );
};

export default LoginForm;
