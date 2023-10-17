"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Dropdown from "@/components/Dropdown";
import Menu, { MenuItem } from "@/components/Menu";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { TbCategory, TbLogin2 } from "react-icons/tb";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, loading } = useQuery(GET_ALL_CATEGORIES);

  return (
    <div className="w-full max-md:px-4 pb-2 pt-4 flex items-center sm:gap-8 container mx-auto max-md:justify-between max-md:flex-row-reverse">
      <Dropdown
        onChange={(value) => console.log(value)}
        options={data?.category.map((category: any) => ({
          label: category.name,
          value: category.id,
        }))}
        label="All Categories"
        loading={loading}
      />
      <div className="max-md:hidden">
        <Menu items={menuItems} />
      </div>
      <div className="md:hidden">
        <Button
          icon={<TbCategory />}
          variant="outlined"
          size="small"
          onClick={() => setIsOpen(true)}
        />
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Menü"
          placement="left"
        >
          <Menu items={menuItems} orientation="vertical" />
        </Drawer>
      </div>
    </div>
  );
};

export default HeaderBottom;
