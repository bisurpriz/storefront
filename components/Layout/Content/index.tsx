import MobileBottomNav from "@/components/MobileBottomNav";

import { Toaster } from "@/components/ui/sonner";
import Footer from "../Footer";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <>
      <Toaster />
      <main className="content-height max-sm:content-height-sm mx-auto flex h-full max-w-screen-2xl flex-col overflow-hidden scroll-smooth px-2 pt-4 max-md:mb-16 sm:px-4">
        {children}
        <MobileBottomNav />
      </main>
      <Footer />
    </>
  );
};

export default Content;
