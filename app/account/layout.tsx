import clsx from "clsx";
import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex gap-8 max-md:flex-col max-md:gap-4">
      <AccountNavigation />
      <div className={clsx("flex-1", "w-full")}>{children}</div>
    </div>
  );
};

export default AccountLayout;
