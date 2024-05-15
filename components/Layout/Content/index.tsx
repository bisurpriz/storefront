import MobileBottomNav from "@/components/MobileBottomNav";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      }
    >
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full md:container pt-6 p-0 px-4 mx-auto scroll-smooth overflow-hidden flex flex-col max-sm:mb-[78px]">
        {children}
        <MobileBottomNav />
      </main>
    </Suspense>
  );
};

export default Content;
