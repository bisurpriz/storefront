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
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global hata:", error);
  }, [error]);

  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.location.reload();
  };

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="container flex flex-col items-center justify-center max-w-lg min-h-screen m-auto">
          <Card className="w-full border-none shadow-none">
            <CardHeader className="gap-2 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-50">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <CardTitle>Beklenmeyen Bir Hata Oluştu</CardTitle>
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
                <NextError statusCode={0} />
              </CardFooter>
            )}
          </Card>
        </div>
      </body>
    </html>
  );
}
