import Search from "@/components/Search";
import Image from "next/image";
import { Link } from "@/components/Link";
import HeaderButtons from "./components/HeaderButtons";
import clsx from "clsx";

const HeaderMiddle = () => {
  return (
    <div
      className={clsx(
        "mb-2 mt-4 flex w-full items-end justify-between gap-4 px-4 lg:gap-8",
        "max-md:mb-0 max-md:mt-2 max-md:items-center max-md:justify-center",
      )}
    >
      <Link href="/" className="min-w-[180px]">
        <Image
          src={"/logo.svg"}
          className="h-14 w-44"
          width={180}
          height={55}
          alt="BiSürpriz Logo"
        />
      </Link>

      <div className="w-full max-md:hidden">
        <Search />
      </div>
      <div className="max-md:hidden">
        <HeaderButtons />
      </div>
    </div>
  );
};

export default HeaderMiddle;
