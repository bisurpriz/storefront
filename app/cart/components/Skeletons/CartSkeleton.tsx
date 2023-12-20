import React from "react";

const CartSkeleton = async () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-8 bg-slate-200 rounded-lg shadow-lg animate-pulse" />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-80">
        <div
          className={`col-span-2 md:col-span-2 p-8 h-full bg-slate-200 rounded-lg shadow-lg animate-pulse`}
        />

        <div className="bg-slate-200 col-span-1 rounded-lg shadow-lg animate-pulse h-full" />
      </div>
    </div>
  );
};

export default CartSkeleton;
