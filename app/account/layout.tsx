import React from "react";
import AccountNavigation from "./components/Navigation";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8 max-md:gap-4 relative">
      <AccountNavigation />
      <div className="shadow-md border border-7 rounded-md p-4 flex-1 mb-4">
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
