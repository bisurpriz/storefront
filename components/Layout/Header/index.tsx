"use client";

import React from "react";
import Divider from "../../Divider";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/Search";
import Dropdown from "@/components/Dropdown";

const headerLeftMenu = [
  {
    label: "About Us",
    link: "about-us",
  },
  {
    label: "My Account",
    link: "my-account",
  },
  {
    label: "Wishlist",
    link: "wishlist",
  },
  {
    label: "Order Tracking",
    link: "order-tracking",
  },
];

const Header = () => {
  return (
    <div className="w-full py-2 border-b text-xs leading-none ">
      <div className="w-full px-10 max-sm:hidden">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 `}>
            {headerLeftMenu.map((item, index) => {
              return (
                <div key={item.link}>
                  <a
                    href={`/${item.link}`}
                    className="hover:text-primary-dark whitespace-nowrap w-fit"
                  >
                    {item.label}
                  </a>

                  {index !== headerLeftMenu.length - 1 && (
                    <Divider orientation="vertical" color="gray-300" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="flex flex-grow-1 w-full justify-center gap-1 text-gray-500 font-medium flex-wrap max-md:hidden">
            Get great devices up to 50% off{" "}
            <Link
              href="/campaign-details"
              className="text-primary hover:text-primary-dark"
            >
              view details
            </Link>
          </p>
          <ul className="text-right whitespace-nowrap">
            <li>
              Need help? Call us:<a href="tel:+905459879355">+905459879355</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[120px] py-6 px-10 flex items-center sm:gap-8">
        <Image
          src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
          width={180}
          height={55}
          alt="BiSürpriz Logo"
          className="mr-8"
          priority
        />
        <Search
          onChange={(value) => console.log(value)}
          onSubmit={() => console.log("submit")}
          options={Array.from({ length: 10 }, (_, i) => ({
            value: i.toString(),
            label: `Option ${i}`,
          }))}
          value="1"
        />
        <Dropdown
          onChange={(value) => console.log(value)}
          options={Array.from({ length: 10 }, (_, i) => ({
            value: i.toString(),
            label: `Option ${i}`,
          }))}
          isSearchable
          dropdownPlacement="bottomLeft"
          label="Select"
          noOptionsMessage="No options"
        />
      </div>
    </div>
  );
};

export default Header;
