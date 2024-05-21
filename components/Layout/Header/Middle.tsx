import Button from "@/components/Button";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import Search from "@/components/Search";

import Image from "next/image";
import Link from "next/link";
import { BsTruck } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import CartButton from "./components/CartButton";
import Tooltip from "@/components/Tooltip";

const HeaderMiddle = async () => {
  return (
    <div className="w-full flex items-end justify-between gap-4 lg:gap-12 my-4 max-md:px-4 ">
      <Link href="/" className="max-sm:hidden min-w-[180px]">
        <Image
          src={"/logo.svg"}
          width={180}
          height={55}
          alt="BiSürpriz Logo"
          priority
        />
      </Link>
      <Search />

      <div className="float-right flex items-center max-sm:hidden">
        <Tooltip content="Favorilerim">
          <Link href="/account/favorites">
            <Button
              icon={<MdOutlineFavoriteBorder />}
              type="button"
              size="small"
              variant="link"
              iconSize={28}
              className="gap-2 py-0 px-0 max-lg:hidden"
            />
          </Link>
        </Tooltip>
        <Tooltip content="Kargo Takip">
          <Link href="/account/orders">
            <Button
              icon={<BsTruck />}
              type="button"
              size="small"
              variant="link"
              iconSize={28}
              className="gap-2 py-0 px-0 max-lg:hidden"
            />
          </Link>
        </Tooltip>
        <CartButton />
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
