import React from "react";
import AccountNavigation from "./components/Navigation";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 gap-4 relative">
      <div className="col-span-2 row-span-full">
        <AccountNavigation />
      </div>
      <div className="col-span-10 row-span-full shadow-md border border-7 rounded-md p-4 h-[1440px]">
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
