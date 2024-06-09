import AccountNavigation from "./components/Navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-8 max-md:gap-4 max-md:flex-col relative">
      <AccountNavigation />
      <div className="shadow-md border border-primary-light rounded-md p-4 flex-1 mb-4 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
