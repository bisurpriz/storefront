"use client";

import Button from "@/components/Button";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import Search from "@/components/Search";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const HeaderMiddle = () => {
  return (
    <div className="w-full h-[120px] py-6 max-sm:h-auto max-md:px-4 flex items-center gap-8 max-md:gap-4 container mx-auto  max-sm:py-1 max-sm:px-2">
      <Image
        src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
        width={180}
        height={55}
        alt="BiSürpriz Logo"
        className="max-sm:hidden"
        priority
      />
      <div className="w-full">
        <Search
          onChange={(value) => console.log(value)}
          onSubmit={() => console.log("submit")}
          options={Array.from({ length: 10 }, (_, i) => ({
            value: i.toString(),
            label: `Option ${i}`,
          }))}
          value="1"
          fullWidth
        />
      </div>

      <div className="w-full float-right flex items-center justify-end gap-4 max-sm:hidden">
        <Button
          icon={<MdOutlineFavoriteBorder />}
          type="button"
          size="small"
          variant="link"
          iconSize={24}
          className="py-0 px-0"
        >
          <Link href="/favorites" className="max-lg:hidden">
            Favorilerim
          </Link>
        </Button>
        <Button
          icon={<AiOutlineShoppingCart />}
          type="button"
          size="small"
          variant="link"
          iconSize={24}
          className="py-0 px-0"
        >
          <Link href="/cart" className="max-lg:hidden">
            Sepetim
          </Link>
        </Button>
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
