import clsx from "clsx";
import React from "react";

const ProductImageGalleryLoading = () => {
  return (
    <div className="w-full flex items-start justify-center gap-2 lg:max-h-[500px]  max-lg:flex-col-reverse">
      <div className="flex flex-col gap-2  max-lg:flex-row items-center justify-start max-h-[500px] h-full overflow-y-auto bg-gray-100 rounded-lg p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
      <div
        className={clsx(
          "flex flex-1 items-start justify-center overflow-hidden relative",
          "h-[500px] w-full object-contain border border-gray-200 rounded-lg aspect-square bg-slate-500"
        )}
      >
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default ProductImageGalleryLoading;
