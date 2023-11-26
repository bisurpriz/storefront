"use client";

import Button from "@/components/Button";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import Search from "@/components/Search";
import useCart from "@/store/cart";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export const dynamic = "dynamic";

const HeaderMiddle = () => {
  const { count } = useCart();

  return (
    <div className="w-full pt-6 pb-2 max-sm:h-auto max-md:py-2 max-md:px-4 flex items-center justify-between gap-4 max-md:gap-4 max-sm:py-1 mb-4">
      <Link href="/" className="max-sm:hidden min-w-[180px]">
        <Image
          src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
          width={180}
          height={55}
          alt="BiSürpriz Logo"
          priority
        />
      </Link>
      <Search
        fullWidth
        onSearch={(value) => {
          console.log(value);
        }}
      />

      <div className="float-right flex items-center max-sm:hidden">
        <Link href="/account/favorites">
          <Button
            icon={<MdOutlineFavoriteBorder />}
            type="button"
            size="small"
            variant="link"
            iconSize={24}
            className="gap-2 py-0 px-0 max-lg:hidden "
          >
            <span className="max-xl:hidden font-normal">Favorilerim</span>
          </Button>
        </Link>
        <Link href="/orders">
          <Button
            icon={<BsTruck />}
            type="button"
            size="small"
            variant="link"
            iconSize={24}
            className="gap-2 py-0 px-0 max-lg:hidden"
          >
            <span className="max-xl:hidden font-normal">Siparişlerim</span>
          </Button>
        </Link>
        <Link href="/cart">
          <Button
            icon={<AiOutlineShoppingCart />}
            type="button"
            size="small"
            variant="link"
            iconSize={24}
            className={`gap-2 py-0 px-0 after:absolute after:top-1 after:right-2
             after:rounded-full after:bg-primary after:text-white 
             after:text-xs after:font-semibold after:leading-4 after:px-1 
             after:py-0.5 after:mt-[-4px] after:mr-[-4px] after:z-10 
             after:shadow after:transform after:-translate-y-1 after:translate-x-1 
             after:transition-all after:duration-300 after:ease-in-out 
             after:transition-none after:content-[attr(data-count)]`}
            data-count={count}
          >
            <span className="max-xl:hidden font-normal">Sepetim</span>
          </Button>
        </Link>
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
