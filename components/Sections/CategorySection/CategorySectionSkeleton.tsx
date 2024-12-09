const CategorySectionSkeleton = () => {
  return (
    <div className="flex cursor-pointer flex-col gap-4 overflow-hidden rounded-sm border-y border-transparent bg-white bg-gradient-to-l from-white via-pink-100 to-white py-8">
      <div className="flex w-full justify-between">
        <div className="h-7 w-1/4 bg-gray-300" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-300" />
          <div className="h-6 w-6 bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-nowrap gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-[250px] min-w-[250px] animate-pulse rounded-lg bg-gray-300 p-4"
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySectionSkeleton;
