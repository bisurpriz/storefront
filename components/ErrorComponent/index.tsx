"use client";

import React, { useEffect } from "react";
import { MdError } from "react-icons/md";
import Button from "@/components/Button";

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
    <div className="h-full w-full p-8 m-auto text-center flex flex-col items-center justify-center gap-12">
      <span className="w-24 h-24 m-auto p-4 bg-white rounded-full shadow-2xl border border-red-500">
        <MdError className="text-6xl text-red-500 items-center m-auto" />
      </span>
      <h1 className="text-xl font-bold text-red-500">Bir hata oluştu</h1>
      <p className="text-sm text-gray-500">
        Beklenmeyen bir hata oluştu.
        <br />
        Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
      </p>
          <Button
              variant="outlined"
              color="error"
              onClick={handleRefresh}>Sayfayı Yenile</Button>
    </div>
  );
};

export default ErrorComponent;
