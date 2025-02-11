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
    <div className="relative flex gap-4 max-md:flex-col">
      <AccountNavigation isMobile={isMobile} />
      <div className={cn("flex-1")}>{children}</div>
    </div>
  );
};

export default AccountLayout;
