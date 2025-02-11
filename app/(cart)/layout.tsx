import { Link } from "@/components/Link";
import Image from "next/image";
import { ReactNode } from "react";

const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
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
      <div className="container relative flex flex-col justify-start flex-1 px-4 mx-auto my-auto md:px-0">
        {children}
      </div>
    </div>
  );
};

export default CartLayout;
