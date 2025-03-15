const SimilarProductsLoadingPage = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Benzer Ürünler</h2>
      <div className="relative w-full">
        <div className="flex gap-4 pb-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-[160px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-gray-200 md:w-[200px]"
            >
              <div className="relative w-full h-40 bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProductsLoadingPage;
