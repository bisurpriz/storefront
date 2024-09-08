import React from "react";

const RecommendedProductsLoadingPage = () => {
  return (
    <div className="flex items-start justify-start gap-4 overflow-x-auto flex-nowrap w-full rounded-lg h-28 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full bg-slate-400 animate-pulse rounded-lg min-w-[300px]"
        />
      ))}
    </div>
  );
};

export default RecommendedProductsLoadingPage;
