import MobileBottomNav from "@/components/MobileBottomNav";

import { Toaster } from "react-hot-toast";
import Footer from "../Footer";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <>
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full md:container pt-4 mx-auto px-4 scroll-smooth overflow-hidden flex flex-col max-md:mb-16">
        {children}
        <MobileBottomNav />
      </main>
      <Footer />
    </>
  );
};

export default Content;
