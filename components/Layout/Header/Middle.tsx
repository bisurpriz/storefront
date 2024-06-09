import Search from "@/components/Search";
import Image from "next/image";
import Link from "next/link";
import HeaderButtons from "./components/HeaderButtons";
import { FiHome } from "react-icons/fi";
import MobileDrawer from "./components/MobileDrawer";
import clsx from "clsx";

const HeaderMiddle = () => {
  return (
    <div
      className={clsx(
        "w-full flex items-end justify-between gap-4 lg:gap-8 mt-4 mb-2 px-4",
        "max-md:justify-start max-md:mt-2 max-md:mb-0"
      )}
    >
      <span className="mb-1 md:hidden">
        <MobileDrawer
          menuData={[
            {
              text: "Anasayfa",
              link: "/",
              icon: <FiHome />,
            },
          ]}
          categories={[]}
        />
      </span>
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
