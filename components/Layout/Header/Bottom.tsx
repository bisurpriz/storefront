"use client";

import Dropdown from "@/components/Dropdown";
import Menu, { MenuItem } from "@/components/Menu";
import React from "react";
import { FiUser } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";

const browAllCategories: DropdownOption[] = [
  {
    label: "All Categories",
    value: "all-categories",
  },
  {
    label: "Chocolate",
    value: "chocolate",
  },
];

const menuItems: MenuItem[] = [
  {
    text: "Popüler",
    link: "/",
    icon: <TbCategory size={24} />,
  },
  { text: "Hakkımızda", link: "/about" },
  {
    text: "Hizmetler",
    link: "/services",
    subMenuItems: [
      { text: "Hizmetler 1", link: "/services1" },
      { text: "Hizmetler 2", link: "/services2" },
      { text: "Hizmetler 3", link: "/services3" },
    ],
  },
  {
    text: "Ürünler",
    link: "/products",
    subMenuItems: [
      { text: "Ürünler 1", link: "/products1" },
      { text: "Ürünler 2", link: "/products2" },
      { text: "Ürünler 3", link: "/products3" },
    ],
  },
  { text: "İletişim", link: "/contact" },
  { text: "Blog", link: "/blog" },
];

const HeaderBottom = () => {
  return (
    <div className="w-full max-md:mx-4 pb-2 pt-4 flex items-center sm:gap-8 container mx-auto">
      <Dropdown
        onChange={(value) => console.log(value)}
        options={browAllCategories}
        label="All Categories"
      />
      <Menu items={menuItems} />
    </div>
  );
};

export default HeaderBottom;
