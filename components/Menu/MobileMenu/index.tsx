import React from "react";
import { MenuItem } from "..";
import Link from "next/link";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Accordion from "@/components/Accordion";

const mobileHeader = [
  {
    link: "/favorites",
    text: "Favorilerim",
    icon: MdOutlineFavoriteBorder,
  },
  {
    link: "/",
    text: "Siparişlerim",
    icon: BsTruck,
  },
  {
    link: "/",
    text: "Hesabım",
    icon: AiOutlineShoppingCart,
  },
];

const accordionItems = [{}];

const MobileMenu = ({ items }: { items: MenuItem[] | undefined }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="w-full grid grid-cols-3 gap-2 mb-2">
        {mobileHeader.map((item, index) => (
          <Link
            key={item.text}
            href={item.link}
            className="flex flex-col items-center justify-center w-full px-2 py-4 border rounded-md border-primarlight text-primary hover:bg-primary-light hover:text-white transition-colors"
          >
            <item.icon className="w-4 h-4" />
            <span className="text-xs">{item.text}</span>
          </Link>
        ))}
      </div>
      <div className="w-full h-full">
        <Accordion
          items={[
            {
              content: <div>adasdasd</div>,
              title: "1",
              className: "border-b",
            },
            {
              content: <div>adasdasd</div>,
              title: "2",
              className: "border-b",
            },
            {
              content: <div>adasdasd</div>,
              title: "3",
              className: "border-b",
            },
            {
              content: <div>adasdasd</div>,
              title: "4",
              className: "border-b",
            },
          ]}
          bordered={false}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
