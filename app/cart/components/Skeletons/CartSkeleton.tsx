import React from "react";

const CartSkeleton = async () => {
  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <div className="w-full  bg-stone-100 animate-pulse flex flex-col gap-4 p-8 rounded-lg">
        <div className="w-full bg-stone-300 animate-pulse p-12 rounded-lg"></div>
        <div className="w-full bg-stone-300 animate-pulse p-12 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CartSkeleton;
