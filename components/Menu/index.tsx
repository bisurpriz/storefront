import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export interface MenuItem {
  text: string | React.ReactElement;
  link: string;
  subMenuItems?: MenuItem[];
  icon?: React.ReactElement;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <nav className={`${quicksand.className} bg-transparent font-semibold`}>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <AiOutlineMenu size={24} />
      </button>
      <ul
        className={`md:flex ${
          isOpen ? "block" : "hidden"
        } text-base leading-4 `}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="relative group py-2 px-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.link}
              className="flex items-center h-full group-hover:text-primary whitespace-nowrap"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.text}
            </Link>
            {item.subMenuItems && (
              <div
                className={`${
                  hoveredIndex === index ? "block" : "hidden"
                } absolute z-10 left-0 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-72 md:w-96 `}
              >
                <ul className="space-y-2">
                  {item.subMenuItems.map((subMenuItem, subIndex) => (
                    <li key={subIndex}>
                      {subMenuItem.icon && (
                        <span className="mr-2">{subMenuItem.icon}</span>
                      )}
                      <Link
                        href={subMenuItem.link}
                        className="block py-2 px-4 text-gray-600 hover:text-primary-dark"
                      >
                        {subMenuItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
