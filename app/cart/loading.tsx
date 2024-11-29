import React from "react";

const CartLoading = () => {
  return (
    <div className="w-full animate-pulse rounded-lg bg-slate-600 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14 rounded-lg bg-slate-700"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 rounded-lg bg-slate-700"></div>
            <div className="h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-700"></div>
      </div>
    </div>
  );
};

export default CartLoading;
