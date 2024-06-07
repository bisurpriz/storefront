import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import HeaderButtons from "./components/HeaderButtons";

const HeaderMiddle = () => {
  return (
    <div className="w-full flex items-end justify-between gap-4 lg:gap-8 mt-4 mb-2 px-4">
      <Link href="/" className="min-w-[180px]">
        <Image
          src={"/logo.svg"}
          width={180}
          height={55}
          alt="BiSürpriz Logo"
          priority
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
