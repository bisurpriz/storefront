import MobileBottomNav from "@/components/MobileBottomNav";

import Footer from "../Footer";
import { Toaster } from "@/components/ui/sonner";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <>
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full max-w-screen-xl pt-4 mx-auto px-4 scroll-smooth overflow-hidden flex flex-col max-md:mb-16">
        {children}
        <MobileBottomNav />
      </main>
      <Footer />
    </>
  );
};

export default Content;
