import React from "react";

const RecommendedProductsLoadingPage = () => {
  return (
    <div className="flex h-28 w-full flex-nowrap items-start justify-start gap-4 overflow-hidden overflow-x-auto rounded-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-full min-w-[300px] flex-1 animate-pulse rounded-lg bg-slate-400"
        />
      ))}
    </div>
  );
};

export default RecommendedProductsLoadingPage;
