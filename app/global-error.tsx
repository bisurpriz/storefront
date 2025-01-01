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
import { AlertTriangle, Cookie, Home, RefreshCw } from "lucide-react";
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
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.location.reload();
  };

  return (
    <html>
      <body>
        <div className="container m-auto flex min-h-screen max-w-lg flex-col items-center justify-center">
          <Card className="w-full border-none shadow-none">
            <CardHeader className="gap-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-500" />
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
                className="flex w-full items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Tekrar Dene
              </Button>

              <Button
                onClick={clearCookies}
                variant="outline"
                className="flex w-full items-center justify-center gap-2"
              >
                <Cookie className="h-4 w-4" />
                Çerezleri Temizle
              </Button>

              <Button
                onClick={() => (window.location.href = "/")}
                variant="ghost"
                className="flex w-full items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Ana Sayfaya Dön
              </Button>
            </CardContent>

            {process.env.NODE_ENV === "development" && error.digest && (
              <CardFooter>
                <p className="w-full text-center text-xs text-muted-foreground">
                  Hata Kodu:{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    {error.digest}
                  </code>
                </p>
              </CardFooter>
            )}
          </Card>
        </div>
      </body>
    </html>
  );
}
