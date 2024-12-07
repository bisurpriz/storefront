"use client";

import GoogleIcon from "@/components/CustomIcons/Google";
import { Link } from "@/components/Link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { login } from "../../actions";
import { AuthErrorMessages } from "../../contants";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const { back } = useRouter();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setError("");
    };
  }, []);

  const handleClientLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const [email, password] = Array.from(event.currentTarget.elements).map(
        (field: HTMLInputElement) => field.value,
      );

      const { error } = await login({
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
        return;
      }

      setError("");
      toast.success("Giriş başarılı", {
        position: "bottom-right",
        id: "login-success",
        duration: 1500,
      });
      onSuccessfulLogin?.(true);
    });
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="space-y-1">
        <div className="mb-4 flex justify-center">
          <Image
            src={"/logo.svg"}
            width={120}
            height={120}
            alt="Login"
            className="w-full max-w-xs"
            priority
          />
        </div>
        <CardTitle className="rounded-md bg-primary-foreground p-2 text-center font-mono text-2xl font-bold">
          Giriş Yap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleClientLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <div className="relative">
              <Input
                id="password"
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" loading={isPending}>
            <LogIn className="mr-2 h-4 w-4" /> Giriş Yap
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          variant="outline"
          className="w-full"
          loading={isPending}
          onClick={() => signIn("google")}
        >
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Google ile giriş yap
        </Button>
        <div className="text-center text-sm">
          Hesabınız yok mu?{" "}
          <Link
            aria-disabled={isPending}
            href="/register"
            className={cn("text-center text-blue-500", {
              "pointer-events-none": isPending,
            })}
            replace
          >
            Kayıt olun
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
