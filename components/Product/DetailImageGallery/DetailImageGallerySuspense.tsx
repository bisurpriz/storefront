import clsx from "clsx";
import React from "react";

const ProductImageGalleryLoading = () => {
  return (
    <div className="flex w-full items-start justify-center gap-2 max-lg:flex-col-reverse lg:max-h-[500px]">
      <div className="flex h-full max-h-[500px] flex-col items-center justify-start gap-2 overflow-hidden rounded-lg bg-gray-100 p-2 max-lg:flex-row">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 w-20 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
      <div
        className={clsx(
          "relative flex flex-1 items-start justify-center overflow-hidden",
          "aspect-square h-[500px] w-full rounded-lg border border-gray-200 bg-slate-500 object-contain",
        )}
      >
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductImageGalleryLoading;
