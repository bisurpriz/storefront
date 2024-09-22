const ProductItemSkeleton = ({ ref = null }) => {
  return (
    <div
      ref={ref}
      className="bg-gray-200 rounded-lg animate-pulse h-[340px] w-full overflow-hidden"
    >
      <div className="w-full xl:h-80 lg:h-56 md:h-52 sm:h-60 h-44 bg-gray-300 rounded object-cover"></div>
      <div className="py-2 px-4 pb-4 flex flex-col gap-2">
        <p className="text-gray-800 text-lg font-bold mt-2 bg-gray-300 h-2 rounded w-2/3"></p>
        <h2 className="text-lg font-semibold mt-2 bg-gray-300 h-6 rounded w-full"></h2>
        <p className="text-gray-600 text-sm mt-1 bg-gray-300 h-4 rounded w-1/2"></p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800 h-8 w-32 bg-gray-300 rounded"></span>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
