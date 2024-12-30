"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sayfa hatası:", error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-destructive">
        Bir şeyler yanlış gitti!
      </h2>
      <p className="text-muted-foreground">
        {error.message || "Beklenmeyen bir hata oluştu."}
      </p>
      <button
        className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        onClick={() => reset()}
      >
        Tekrar Dene
      </button>
    </div>
  );
}
