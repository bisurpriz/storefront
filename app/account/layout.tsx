import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import AccountNavigation from "./components/Navigation";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  const { device } = userAgent({
    headers: await headers(),
  });

  const isMobile = device.type === "mobile";

  return (
    <div className="relative flex max-md:flex-col max-md:gap-4">
      <AccountNavigation
        isMobile={isMobile}
      />
      <div
        className={cn("flex min-h-[50dvh] flex-1 flex-col max-sm:h-[70dvh]")}
      >
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
