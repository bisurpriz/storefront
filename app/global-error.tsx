"use client";

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

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
          <h2 className="text-3xl font-bold text-destructive">
            Kritik Bir Hata Oluştu!
          </h2>
          <p className="text-lg text-muted-foreground">
            {error.message || "Beklenmeyen bir hata oluştu."}
          </p>
          <button
            className="rounded-md bg-primary px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-primary/90"
            onClick={() => reset()}
          >
            Sayfayı Yenile
          </button>
        </div>
      </body>
    </html>
  );
}
