"use client";

const ErrorPage = () => {
  return (
    <div className="w-full py-6 max-sm:h-auto max-md:px-4 flex items-center justify-between gap-8 max-md:gap-4 container mx-auto  max-sm:py-1 max-sm:px-2">
      <h1 className="text-4xl font-bold text-center">404</h1>

      <p className="text-2xl font-bold text-center">
        Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.
      </p>
    </div>
  );
};

export default ErrorPage;
