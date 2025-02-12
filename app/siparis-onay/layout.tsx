import { Link } from "@/components/Link";
import Image from "next/image";

const OrderApproveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-center p-6 border-y">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            width={240}
            height={240}
            alt="Login"
            priority
          />
        </Link>
      </div>
      <div className="container relative flex flex-col items-start justify-start h-full px-4 mx-auto md:px-0">
        {children}
      </div>
    </>
  );
};

export default OrderApproveLayout;
