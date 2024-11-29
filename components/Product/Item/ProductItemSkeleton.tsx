const ProductItemSkeleton = ({ ref = null }) => {
  return (
    <div
      ref={ref}
      className="mt-5 flex min-h-[136px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-200 max-sm:h-[136px] sm:min-h-[340px] sm:flex-col"
    >
      <div className="h-full w-full rounded bg-gray-300 object-cover max-sm:w-[122px] max-sm:min-w-[122px] sm:h-60 md:h-52 lg:h-56 xl:h-80"></div>
      <div className="flex w-full flex-col gap-2 px-4 py-2 pb-4">
        <p className="w-ful mt-2 h-4 rounded bg-gray-300 text-lg font-bold text-gray-700 sm:h-2 sm:w-2/3"></p>
        <h2 className="mt-2 h-6 w-full rounded bg-gray-300 text-lg font-semibold"></h2>
        <p className="mt-1 h-4 w-1/2 rounded bg-gray-300 text-sm text-gray-600"></p>
        <div className="mt-4 flex items-center justify-between">
          <span className="h-8 w-32 rounded bg-gray-300 text-xl font-bold text-gray-700"></span>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
