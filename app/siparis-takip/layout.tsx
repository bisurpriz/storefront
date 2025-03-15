import { Link } from "@/components/Link";
import Image from "next/image";

const OrderTrackingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center p-2 mb-6 border-y md:p-6">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            width={120}
            height={120}
            alt="Login"
            priority
          />
        </Link>
      </div>
      <div className="container relative flex flex-col items-center justify-center flex-1 h-full px-4 mx-auto md:px-0">
        {children}
      </div>
    </div>
  );
};

export default OrderTrackingLayout;
