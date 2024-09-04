"use client";

import { Category } from "@/common/types/Category/category";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import HamburgerMenu from "@/components/Icons/HamburgerMenu";
import MobileMenu from "@/components/Menu/MobileMenu";
import { useState } from "react";

const MobileDrawer = ({
  categories,
  menuData,
}: {
  categories: Category[];
  menuData: MenuItem[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        icon={<HamburgerMenu className="text-[28px]" />}
        variant="link"
        size="small"
        iconSize={24}
        className="!p-0 !pt-2 !pr-2 mb-1"
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Menü"
        placement="left"
        lockScroll={true}
      >
        <MobileMenu items={menuData} />
      </Drawer>
    </>
  );
};

export default MobileDrawer;
