"use client";

import ProductImageGalleryLoading from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { cn } from "@/lib/utils";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

const ProductImageGalleryErrorPage = ({
  error,
}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <h2
        className={cn(
          "absolute left-0 top-1/2 z-10 w-full max-w-xs -translate-y-1/2 translate-x-1/2 text-center text-xl font-semibold text-red-600",
        )}
      >
        Beklenmedik bir hatadan dolayı ürün görselleri yüklenemedi !
      </h2>
      <ProductImageGalleryLoading />
    </div>
  );
};

export default ProductImageGalleryErrorPage;
