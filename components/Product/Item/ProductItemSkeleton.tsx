const ProductItemSkeleton = ({ ref = null }) => {
  return (
    <div
      ref={ref}
      className="min-h-[340px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-200"
    >
      <div className="h-44 w-full rounded bg-gray-300 object-cover sm:h-60 md:h-52 lg:h-56 xl:h-80"></div>
      <div className="flex flex-col gap-2 px-4 py-2 pb-4">
        <p className="mt-2 h-2 w-2/3 rounded bg-gray-300 text-lg font-bold text-gray-700"></p>
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
