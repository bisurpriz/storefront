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
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container m-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center p-4">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="gap-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <CardTitle>Bir Hata Oluştu</CardTitle>
          <CardDescription>
            Bu işlem sırasında bir sorun oluştu. Lütfen tekrar deneyin.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            onClick={() => reset()}
            className="flex w-full items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tekrar Dene
          </Button>
        </CardContent>

        {/* {process.env.NODE_ENV === "development" && ( */}
        <CardFooter className="flex flex-col gap-2">
          <p className="w-full text-center text-xs text-muted-foreground">
            Hata Mesajı:{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              {error.message}
            </code>
          </p>
          {error.digest && (
            <p className="w-full text-center text-xs text-muted-foreground">
              Hata Kodu:{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                {error.digest}
              </code>
            </p>
          )}
        </CardFooter>
        {/* )} */}
      </Card>
    </div>
  );
}
