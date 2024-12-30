import { cn } from "@/lib/utils";
import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex max-md:flex-col max-md:gap-4">
      <AccountNavigation />
      <div
        className={cn("flex min-h-[50dvh] flex-1 flex-col max-sm:h-[70dvh]")}
      >
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
