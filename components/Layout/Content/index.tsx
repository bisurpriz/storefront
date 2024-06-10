import MobileBottomNav from "@/components/MobileBottomNav";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";

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
      <main className="content-height max-sm:content-height-sm h-full md:container pt-4 mx-auto px-4 scroll-smooth overflow-hidden flex flex-col">
        {children}
        <MobileBottomNav />
      </main>
      <Footer />
    </Suspense>
  );
};

export default Content;
