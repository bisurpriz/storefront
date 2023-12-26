import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8 max-md:gap-4 relative">
      <AccountNavigation />
      <div className="shadow-md border border-7 rounded-md p-4 flex-1 mb-4 overflow-hidden h-[74vh]">{children}</div>
    </div>
  );
};

export default AccountLayout;
