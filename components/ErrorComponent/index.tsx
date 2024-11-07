"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Error from "../Icons/Error";

const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const handleRefresh = () => {
    !reset ? window.location.reload() : reset();
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-12 p-8 text-center">
      <span className="m-auto h-24 w-24 rounded-full border border-red-500 bg-white p-4 shadow-2xl">
        <Error className="m-auto items-center text-6xl text-red-500" />
      </span>
      <h1 className="text-xl font-bold text-red-500">Bir hata oluştu</h1>
      <p className="text-sm text-gray-500">
        Beklenmeyen bir hata oluştu.
        <br />
        Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
      </p>
      <Button variant="destructive" onClick={handleRefresh}>
        Sayfayı Yenile
      </Button>
    </div>
  );
};

export default ErrorComponent;
