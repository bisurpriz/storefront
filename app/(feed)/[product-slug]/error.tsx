"use client";

import ProductImageGalleryLoading from "@/components/Product/DetailImageGallery/DetailImageGallerySuspense";
import { cn } from "@/lib/utils";

const ProductImageGalleryErrorPage = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <h2
        className={cn(
          "absolute left-0 top-1/2 z-10 w-full max-w-xs -translate-y-1/2 translate-x-1/2 text-center font-mono text-xl font-semibold text-red-600",
        )}
      >
        Beklenmedik bir hatadan dolayı ürün görselleri yüklenemedi !
      </h2>
      <ProductImageGalleryLoading />
    </div>
  );
};

export default ProductImageGalleryErrorPage;
