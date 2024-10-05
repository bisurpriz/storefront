import clsx from "clsx";
import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8 max-md:gap-4 max-md:flex-col relative">
      <AccountNavigation />
      <div className={clsx("flex-1", "w-full")}>{children}</div>
    </div>
  );
};

export default AccountLayout;
