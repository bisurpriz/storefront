import React from "react";

const CartLoading = () => {
  return (
    <div className="w-full p-4 bg-slate-600 animate-pulse rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 bg-slate-700 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-4 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CartLoading;
