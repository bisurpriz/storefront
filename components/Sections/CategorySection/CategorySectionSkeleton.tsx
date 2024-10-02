import React from "react";

const CategorySectionSkeleton = () => {
  return (
    <div className="bg-white border-y border-transparent bg-gradient-to-l from-white via-pink-100  to-white rounded-sm overflow-hidden cursor-pointer flex flex-col gap-4 py-8">
      <div className="w-full flex justify-between">
        <div className="w-1/4 h-7 bg-gray-300" />
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-gray-300" />
          <div className="w-6 h-6 bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-nowrap gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div className="p-4 min-w-[250px] h-[250px] rounded-lg bg-gray-300 animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default CategorySectionSkeleton;
