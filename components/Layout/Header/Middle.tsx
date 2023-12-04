"use client";

import Badge from "@/components/Badge";
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
          <Badge badgeContent={count}>
            <Button
              icon={<AiOutlineShoppingCart />}
              type="button"
              size="small"
              variant="link"
              iconSize={24}
              className={`gap-2 py-0 px-0`}
            >
              <span className="max-xl:hidden font-normal">Sepetim</span>
            </Button>
          </Badge>
        </Link>
        <HeaderProfile />
      </div>
    </div>
  );
};

export default HeaderMiddle;
