"use client";

import { registerUser } from "@/app/account/actions";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { AuthErrorMessages } from "../../contants";
import toast from "react-hot-toast";
import { login } from "../../actions";
import { socialLogins } from "../../(.)login/components/LoginForm";
import clsx from "clsx";

type RegisterFormProps = {
  onSuccessfulRegister?: (status: boolean) => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onSuccessfulRegister }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.elements, "event.currentTarget.elements");
    setLoading(true);
    const [email, password, firstname, lastname] = Array.from(
      event.currentTarget.elements
    ).map((field: HTMLInputElement) => field.value);

    const response = await registerUser({
      email,
      password,
      firstname,
      lastname,
    });

    console.log(response, "response");

    if (response.error) {
      const errorMessage =
        AuthErrorMessages[response.error as keyof typeof AuthErrorMessages];

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
    } else if (response.body.insert_user.affected_rows) {
      const response = await login({ email, password });

      console.log(response, "response login");

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
      } else {
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
        onSuccessfulRegister?.(true);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex flex-col items-center justify-center bg-white w-[500px] rounded-lg p-12 m-auto gap-4 font-mono">
        <div className="w-full max-w-[400px] mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <Image
              src="/logo.svg"
              width={300}
              height={300}
              alt="Login"
              className="m-auto"
            />
            <h1 className="text-3xl font-bold text-center">Giriş Yap</h1>
            <p className="text-center text-gray-500">
              Sipariş verebilmek, kampanyalardan faydalanabilmek ve daha fazlası
              için giriş yapın.
            </p>
          </div>
          <div className="space-y-4">
            <TextField
              autoComplete="off"
              id="firstname"
              label="Adınız"
              placeholder="Adınız"
              fullWidth
            />
            <TextField
              autoComplete="off"
              id="lastname"
              label="Soyadınız"
              placeholder="Soyadınız"
              fullWidth
            />
            <TextField
              autoComplete="off"
              id="email"
              label="Email"
              type="email"
              placeholder="Mail adresiniz"
              fullWidth
              error={!!error}
            />
            <TextField
              autoComplete="off"
              id="password"
              label="Şifre"
              type="password"
              placeholder="Şifre"
              fullWidth
              error={!!error}
            />
            <Button type="submit" loading={loading} className="m-auto">
              Kayıt Ol
            </Button>
          </div>
          <div>
            <p className="text-center text-gray-500">
              Hesabınız var mı?{" "}
              <Link href="/login" className="text-blue-500" replace>
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>

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
      </div>
    </form>
  );
};

export default RegisterForm;
