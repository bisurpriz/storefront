const SimilarProductsLoadingPage = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Benzer Ürünler</h2>
      <div className="relative w-full">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-[160px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-gray-200 md:w-[200px]"
            >
              <div className="relative h-40 w-full animate-pulse bg-gray-200"></div>
              <div className="p-3">
                <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProductsLoadingPage;
