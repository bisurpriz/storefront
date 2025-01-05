const ProductCommentsLoadingPage = () => {
  return (
    <div className="px-4 py-8">
      <div className="mb-4 h-4 w-44 animate-pulse rounded-lg bg-primary/20" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div className="mb-4 flex items-center gap-2 last:mb-0" key={i}>
          <div className="flex w-52 items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20" />
            <div className="flex flex-col gap-2 p-2">
              <div className="h-4 w-32 animate-pulse rounded-lg bg-primary/20" />
              <div className="h-4 w-20 animate-pulse rounded-lg bg-primary/20" />
              <div className="h-2 w-32 animate-pulse rounded-lg bg-primary/20" />
            </div>
          </div>
          <div className="h-14 w-1/2 animate-pulse rounded-lg bg-primary/20" />
        </div>
      ))}
    </div>
  );
};

export default ProductCommentsLoadingPage;
