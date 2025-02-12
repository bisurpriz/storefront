"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, Cookie, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.location.reload();
  };

  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="container m-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="gap-2 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-amber-50">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <CardTitle>Bir Şeyler Yanlış Gitti</CardTitle>
          <CardDescription>
            Üzgünüz, işleminiz tamamlanamadı. Lütfen tekrar deneyin veya ana
            sayfaya dönün.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Button
            onClick={() => reset()}
            className="flex items-center justify-center w-full gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </Button>

          <Button
            onClick={clearCookies}
            variant="outline"
            className="flex items-center justify-center w-full gap-2"
          >
            <Cookie className="w-4 h-4" />
            Çerezleri Temizle
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="ghost"
            className="flex items-center justify-center w-full gap-2"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Button>
        </CardContent>

        {process.env.NODE_ENV === "development" && error.digest && (
          <CardFooter>
            <p className="w-full text-xs text-center text-muted-foreground">
              Hata Kodu:{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                {error.digest}
              </code>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
