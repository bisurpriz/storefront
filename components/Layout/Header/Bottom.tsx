"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Menu from "@/components/Menu";
import MobileMenu from "@/components/Menu/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";

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
    link: `/category/${category.slug}`,
    text: category.name,
  }));

  return (
    <div className="w-full max-md:px-4 pb-2 pt-4 flex items-center sm:gap-8 max-md:justify-between">
      <Menu items={menuData} className="max-sm:hidden" />
      <Link href="/" className="mx-auto sm:hidden">
        <Image
          src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
          width={180}
          height={55}
          alt="BiSürpriz Logo"
          priority
        />
      </Link>
      <div className="sm:hidden">
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
    </div>
  );
};

export default HeaderBottom;
