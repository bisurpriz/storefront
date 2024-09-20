import Search from "@/components/Search";
import Image from "next/image";
import { Link } from "@/components/Link";
import HeaderButtons from "./components/HeaderButtons";
import clsx from "clsx";

const HeaderMiddle = () => {
  return (
    <div
      className={clsx(
        "w-full flex items-end justify-between gap-4 lg:gap-8 mt-4 mb-2 px-4",
        "max-md:justify-center max-md:items-center max-md:mt-2 max-md:mb-0"
      )}
    >
      <Link href="/" className="min-w-[180px]">
        <Image
          src={"/logo.svg"}
          className="w-44 h-14"
          width={180}
          height={55}
          alt="BiSürpriz Logo"
        />
      </Link>

      <div className="max-md:hidden w-full">
        <Search />
      </div>
      <div className="max-md:hidden">
        <HeaderButtons />
      </div>
    </div>
  );
};

export default HeaderMiddle;
