const ProductCommentsLoadingPage = () => {
  return (
    <div className="px-4 py-8">
      <div className="h-4 w-44 mb-4 bg-slate-300 animate-pulse rounded-lg" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div className="flex gap-2 items-center last:mb-0 mb-4" key={i}>
          <div className="flex gap-2 items-center w-52">
            <div className="rounded-full w-8 h-8 bg-slate-300 animate-pulse" />
            <div className="p-2 flex flex-col gap-2">
              <div className="h-4 w-32 bg-slate-300 animate-pulse rounded-lg" />
              <div className="h-4 w-20 bg-slate-300 animate-pulse rounded-lg" />
              <div className="h-2 w-32 bg-slate-300 animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="w-1/2 bg-slate-300 animate-pulse h-14 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default ProductCommentsLoadingPage;
