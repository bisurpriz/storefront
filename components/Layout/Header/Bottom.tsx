"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Dropdown from "@/components/Dropdown";
import Menu, { MenuItem } from "@/components/Menu";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import { TbCategory } from "react-icons/tb";
import { MdMenu } from "react-icons/md";

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
      <div className="max-sm:hidden">
        <Dropdown
          onChange={(value) => console.log(value)}
          options={data?.category.map((category: any) => ({
            label: category.name,
            value: category.id,
          }))}
          label="All Categories"
          loading={loading}
        />
      </div>
      <div className="max-md:hidden">
        <Menu items={menuItems} />
      </div>
      <Image
        src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
        width={180}
        height={55}
        alt="BiSürpriz Logo"
        className="mx-auto sm:hidden"
        priority
      />
      <div className="md:hidden">
        <Button
          icon={<MdMenu />}
          variant="outlined"
          size="large"
          iconSize={24}
          className="max-sm:p-1"
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
