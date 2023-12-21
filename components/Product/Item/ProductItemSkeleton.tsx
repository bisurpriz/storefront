const ProductItemSkeleton = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 animate-pulse border">
      <div className="w-full h-48 bg-gray-300 rounded object-cover"></div>
      <h2 className="text-lg font-semibold mt-2 bg-gray-300 h-6 rounded w-2/3"></h2>
      <p className="text-gray-600 text-sm mt-1 bg-gray-300 h-4 rounded w-1/2"></p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-800 h-8 w-16 bg-gray-300 rounded"></span>
        <div className="w-20 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
