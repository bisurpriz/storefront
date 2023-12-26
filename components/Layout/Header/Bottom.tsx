"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Menu from "@/components/Menu";
import MobileMenu from "@/components/Menu/MobileMenu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import CartButton from "./components/CartButton";

interface Props {
  categories: {
    id: number;
    name: string;
    slug: string;
    image_url: string;
  }[];
}

const HeaderBottom = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuData: MenuItem[] | undefined = categories?.map((category) => ({
    link: `/${category.slug}`,
    text: category.name,
  }));

  return (
    <div className="w-full max-md:px-4 pb-2 pt-2 flex items-center sm:gap-8 max-md:justify-between overflow-hidden">
      <Menu items={menuData} className="max-sm:hidden" />
      <Link href="/" className="sm:hidden max-sm:mr-auto">
        <Image
          src={"/logo.svg"}
          width={180}
          height={55}
          alt="Bonnmarşe Logo"
          priority
        />
      </Link>
      <div className="sm:hidden flex">
        <CartButton />
        <Button
          icon={<MdMenu />}
          variant="outlined"
          size="small"
          iconSize={24}
          className="max-sm:p-1"
          onClick={() => setIsOpen(true)}
        />
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Menü"
          placement="left"
          lockScroll={true}
        >
          <MobileMenu items={menuData} />
        </Drawer>
      </div>
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
