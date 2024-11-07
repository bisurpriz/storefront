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
      <main className="content-height max-sm:content-height-sm mx-auto flex h-full max-w-screen-2xl flex-col overflow-hidden scroll-smooth px-4 pt-4 max-md:mb-16">
        {children}
        <MobileBottomNav />
      </main>
      <Footer />
    </>
  );
};

export default Content;
