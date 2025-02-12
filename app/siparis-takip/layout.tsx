import { Link } from "@/components/Link";
import Image from "next/image";

const OrderTrackingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex justify-center border-y p-6">
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
      <div className="container relative mx-auto flex h-full flex-1 flex-col items-center justify-center px-4 md:px-0">
        {children}
      </div>
    </div>
  );
};

export default OrderTrackingLayout;
