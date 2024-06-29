import clsx from "clsx";
import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8 max-md:gap-4 max-md:flex-col relative">
      <AccountNavigation />
      <div
        className={clsx(
          "flex-1",
          "w-full",
          "p-4",
          "bg-white",
          "rounded-md",
          "shadow-md",
          "max-md:rounded-none",
          "max-md:shadow-none",
          "max-md:w-full",
          "max-md:border-none",
          "max-md:p-0",
          "border border-secondary-light"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
