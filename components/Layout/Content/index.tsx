import MobileBottomNav from "@/components/MobileBottomNav";
import { getDevice } from "@/utils/getDevice";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  const userAgent = headers().get("user-agent");
  const isMobile = getDevice(userAgent) === "mobile";

  return (
    <Suspense fallback={<>Loading ...</>}>
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full md:container pt-6 p-0 px-4 mx-auto scroll-smooth flex flex-col max-sm:mb-[78px]">
        {isMobile ? "Şu an mobil cihazdasınız" : "Şu an masaüstü cihazdasınız"}
        <br />
        {JSON.stringify(userAgent, null, 2)}
        {children}
        <MobileBottomNav isMobile={isMobile} />
      </main>
    </Suspense>
  );
};

export default Content;
