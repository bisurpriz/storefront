"use client";

import Dropdown from "@/components/Dropdown";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import Search from "@/components/Search";

import Image from "next/image";
import React from "react";

const HeaderMiddle = () => {
  return (
    <div className="w-full h-[120px] py-6 max-sm:h-auto max-md:px-4 flex items-center sm:gap-8 container mx-auto">
      <Image
        src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
        width={180}
        height={55}
        alt="BiSürpriz Logo"
        className="mr-8"
        priority
      />
      <div className="max-lg:hidden w-full">
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

      <div className="w-full float-right">
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
