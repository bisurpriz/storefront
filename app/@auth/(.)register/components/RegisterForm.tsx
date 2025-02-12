"use client";

import { registerUser } from "@/app/(account)/account/actions";
import { Link } from "@/components/Link";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { login } from "../../actions";
import { AuthErrorMessages } from "../../contants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 2;

type RegisterFormProps = {
  onSuccessfulRegister?: (status: boolean) => void;
};

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccessfulRegister }) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    if (formData.firstname.length < MIN_NAME_LENGTH) {
      errors.firstname = "Ad en az 2 karakter olmalıdır";
    }

    if (formData.lastname.length < MIN_NAME_LENGTH) {
      errors.lastname = "Soyad en az 2 karakter olmalıdır";
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = "Şifre en az 6 karakter olmalıdır";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));

      if (isSubmitted) {
        validateForm();
      }
    },
    [isSubmitted, validateForm],
  );

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const isValid = validateForm();
    if (!isValid) return;

    setIsPending(true);

    try {
      const response = await registerUser(formData);

      if (response.data.error) {
        const errorMessage =
          AuthErrorMessages[
            response.data.error as keyof typeof AuthErrorMessages
          ];

        toast({
          title: errorMessage,
          description: "Bir hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive",
          duration: 1500,
        });
        return;
      }

      if (response.data.affected_rows) {
        const loginResponse = await login({
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.data.error) {
          const errorMessage =
            AuthErrorMessages[
              loginResponse.data.error as keyof typeof AuthErrorMessages
            ];

          toast({
            title: errorMessage,
            description: "Bir hata oluştu. Lütfen tekrar deneyin.",
            variant: "destructive",
            duration: 1500,
          });
          return;
        }

        toast({
          title: "Kayıt başarılı",
          duration: 1500,
        });
        onSuccessfulRegister?.(true);
      }
    } catch (error) {
      console.error("Register error:", error);
      toast({
        title: "Bir hata oluştu. Lütfen tekrar deneyin.",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={cn("relative", isPending && "pointer-events-none opacity-60")}
    >
      <form onSubmit={handleRegister}>
        <Card className="border-none shadow-none">
          <CardHeader className="space-y-2">
            <Image
              src="/logo.svg"
              width={300}
              height={300}
              alt="Register"
              className="mx-auto h-12 w-auto"
              priority
            />
            <div className="space-y-1 text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Hesabınızı Oluşturun
              </h1>
              <p className="text-sm text-muted-foreground">
                Hesabınızı oluşturarak daha hızlı ve kolay bir şekilde giriş
                yapabilir ve işlemlerinizi gerçekleştirebilirsiniz.
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <TextField
              id="firstname"
              label="Adınız"
              placeholder="Adınız"
              value={formData.firstname}
              onChange={handleInputChange}
              error={isSubmitted && !!validationErrors.firstname}
              errorMessage={isSubmitted ? validationErrors.firstname : ""}
              autoComplete="given-name"
              required
              fullWidth
            />
            <TextField
              id="lastname"
              label="Soyadınız"
              placeholder="Soyadınız"
              value={formData.lastname}
              onChange={handleInputChange}
              error={isSubmitted && !!validationErrors.lastname}
              errorMessage={isSubmitted ? validationErrors.lastname : ""}
              autoComplete="family-name"
              required
              fullWidth
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Mail adresiniz"
              value={formData.email}
              onChange={handleInputChange}
              error={isSubmitted && !!validationErrors.email}
              errorMessage={isSubmitted ? validationErrors.email : ""}
              autoComplete="email"
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Şifre"
              type="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleInputChange}
              error={isSubmitted && !!validationErrors.password}
              errorMessage={isSubmitted ? validationErrors.password : ""}
              autoComplete="new-password"
              required
              fullWidth
            />

            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              className="w-full"
            >
              Kayıt Ol
            </Button>
          </CardContent>

          <CardFooter>
            <p className="w-full text-center text-sm text-muted-foreground">
              Hesabınız var mı?{" "}
              <Link
                href="/login"
                className={cn("text-primary hover:text-primary/90", {
                  "pointer-events-none": isPending,
                })}
                replace
              >
                Giriş yapın
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
