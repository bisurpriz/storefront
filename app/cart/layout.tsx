"use client";

import Button from "@/components/Button";

export const dynamic = "force-dynamic";
const CartLayout = ({
  children,
  summary,
  steps,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  steps: React.ReactNode;
}) => {
  return (
    <>
      <span className="block text-3xl mb-3">{steps}</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`col-span-2 md:col-span-2 flex flex-col gap-3`}>
          {children}
        </div>
        <div className="max-md:fixed max-md:w-full max-md:left-0 bg-white max-md:px-4 md:h-fit max-md:bottom-0 col-span-1 md:relative max-md:shadow-lg">
          {summary}
          <Button
            className="hidden md:block fixed bottom-0 right-0 mt-4 w-full"
            variant="outlined"
            size="large"
            label="Devam Et"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default CartLayout;
