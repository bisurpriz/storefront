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
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState, useTransition } from "react";
import { login } from "../../actions";
import { AuthErrorMessages } from "../../contants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

type LoginFormProps = {
  onSuccessfulLogin?: (status: boolean) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSuccessfulLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const { back } = useRouter();

  useEffect(() => {
    return () => {
      setFormData({ email: "", password: "", showPassword: false });
      setValidationErrors({ email: "", password: "" });
      setIsSubmitted(false);
    };
  }, []);

  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (lockTimer === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [isLocked, lockTimer]);

  const validateForm = useCallback(() => {
    const errors = {
      email: "",
      password: "",
    };

    if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = "Şifre en az 6 karakter olmalıdır";
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  }, [formData.email, formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Sadece submit edilmişse ve input değiştiğinde validate et
    if (isSubmitted) {
      validateForm();
    }
  };

  const handleTogglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleLoginAttempt = () => {
    const MAX_ATTEMPTS = 5;
    const LOCK_TIME = 300; // 5 minutes in seconds

    setLoginAttempts((prev) => {
      const newAttempts = prev + 1;
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimer(LOCK_TIME);
        toast({
          title: `Çok fazla başarısız deneme. ${LOCK_TIME / 60} dakika sonra tekrar deneyin.`,
          description: "Lütfen daha sonra tekrar deneyin.",
          duration: 5000,
          variant: "destructive",
        });
      }
      return newAttempts;
    });
  };

  const handleClientLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const isValid = validateForm();
    if (!isValid || isLocked) return;

    startTransition(async () => {
      try {
        const { data } = await login({
          email: formData.email,
          password: formData.password,
        });

        if (data.error) {
          const errorMessage =
            AuthErrorMessages[data.error as keyof typeof AuthErrorMessages];
          handleLoginAttempt();
          toast({
            title: errorMessage,
            description: "Lütfen daha sonra tekrar deneyin.",
            duration: 1500,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Giriş başarılı",
          description: "",
          duration: 1500,
        });
        onSuccessfulLogin?.(true);
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Bir hata oluştu. Lütfen tekrar deneyin.",
          description: "Lütfen daha sonra tekrar deneyin.",
          duration: 3000,
          variant: "destructive",
        });
      }
    });
  };

  const handleGoogleLogin = useCallback(async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google ile giriş yapılırken bir hata oluştu.",
        description: "Lütfen daha sonra tekrar deneyin.",
        duration: 3000,
        variant: "destructive",
      });
    }
  }, []);

  if (isLocked) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-semibold text-destructive">
            Hesap Kilitlendi
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Kalan süre: {Math.floor(lockTimer / 60)}:
            {lockTimer % 60 < 10 ? "0" : ""}
            {lockTimer % 60}
          </p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className={cn("relative", isPending && "pointer-events-none")}>
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo.svg"
              width={120}
              height={120}
              alt="Login"
              className="w-full max-w-xs"
              priority
            />
          </div>
          <CardTitle className="rounded-md bg-primary-foreground p-2 text-center text-2xl font-bold">
            Giriş Yap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleClientLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-posta adresinizi girin"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className={cn({
                  "border-red-500 focus-visible:ring-red-500":
                    isSubmitted && !!validationErrors.email,
                })}
                aria-invalid={isSubmitted && !!validationErrors.email}
                aria-describedby={
                  isSubmitted && validationErrors.email
                    ? "email-error"
                    : undefined
                }
              />
              {isSubmitted && validationErrors.email && (
                <p id="email-error" className="text-sm text-red-500">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  type={formData.showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={cn({
                    "border-red-500 focus-visible:ring-red-500":
                      isSubmitted && !!validationErrors.password,
                  })}
                  aria-invalid={isSubmitted && !!validationErrors.password}
                  aria-describedby={
                    isSubmitted && validationErrors.password
                      ? "password-error"
                      : undefined
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={handleTogglePassword}
                  aria-label={
                    formData.showPassword ? "Şifreyi gizle" : "Şifreyi göster"
                  }
                >
                  {formData.showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {isSubmitted && validationErrors.password && (
                <p id="password-error" className="text-sm text-red-500">
                  {validationErrors.password}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              loading={isPending}
              disabled={isPending}
            >
              <LogIn className="mr-2 h-4 w-4" /> Giriş Yap
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full"
            loading={isPending}
            onClick={handleGoogleLogin}
            disabled={isPending}
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
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
    </div>
  );
};

export default LoginForm;
