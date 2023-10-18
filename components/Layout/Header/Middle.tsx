"use client";

import Button from "@/components/Button";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import Search from "@/components/Search";

import Image from "next/image";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const HeaderMiddle = () => {
  return (
    <div className="w-full h-[120px] py-6 max-sm:h-auto max-md:px-4 flex items-center sm:gap-8 container mx-auto  max-sm:py-1 max-sm:px-2">
      <Image
        src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
        width={180}
        height={55}
        alt="BiSürpriz Logo"
        className="mr-8 max-sm:hidden"
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

      <div className="w-full float-right flex items-center justify-end gap-8 max-sm:hidden">
        <Button
          icon={<AiOutlineShoppingCart />}
          type="button"
          size="small"
          variant="outlined"
        />
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
