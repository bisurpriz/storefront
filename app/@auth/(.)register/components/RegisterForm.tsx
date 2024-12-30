"use client";

import { registerUser } from "@/app/account/actions";
import { Link } from "@/components/Link";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "sonner";
import { login } from "../../actions";
import { AuthErrorMessages } from "../../contants";

type RegisterFormProps = {
  onSuccessfulRegister?: (status: boolean) => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onSuccessfulRegister }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const [firstname, lastname, email, password] = Array.from(
      event.currentTarget.elements,
    ).map((field: HTMLInputElement) => field.value);

    const response = await registerUser({
      email,
      password,
      firstname,
      lastname,
    });

    if (response.data.error) {
      const errorMessage =
        AuthErrorMessages[
          response.data.error as keyof typeof AuthErrorMessages
        ];

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-right",

        id: "login-error",
        duration: 1500,
      });
      setLoading(false);
      return;
    } else if (response.data.affected_rows) {
      const {
        data: { error },
      } = await login({
        email,
        password,
      });

      if (error) {
        const errorMessage =
          AuthErrorMessages[error as keyof typeof AuthErrorMessages];

        setError(errorMessage);
        toast.error(errorMessage, {
          position: "bottom-right",

          id: "login-error",
          duration: 1500,
        });
        setLoading(false);
        return;
      } else {
        setError("");
        toast.success("Giriş başarılı", {
          position: "bottom-right",

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
      <Card className="border-none shadow-none">
        <CardTitle className="my-2 space-y-2 text-center">
          <Image
            src={"/logo.svg"}
            width={300}
            height={300}
            alt="Login"
            className="m-auto"
            priority
          />
          <h1 className="text-center text-lg font-bold">
            Hesabınızı Oluşturun
          </h1>
          <p className="text-center text-sm text-gray-500">
            Hesabınızı oluşturarak daha hızlı ve kolay bir şekilde giriş
            yapabilir ve işlemlerinizi gerçekleştirebilirsiniz.
          </p>
        </CardTitle>
        <CardContent className="space-y-4">
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
        </CardContent>
        <div className="mt-4">
          <p className="text-center text-gray-500">
            Hesabınız var mı?{" "}
            <Link href="/login" className="text-blue-500" replace>
              Giriş yapın
            </Link>
          </p>
        </div>

        {/* <div className="flex flex-col gap-2 w-full justify-center items-center mt-4">
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
        </span> */}
      </Card>
    </form>
  );
};

export default RegisterForm;
