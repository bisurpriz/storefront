'use client';

import { Category } from '@/common/types/Category/category';
import Button from '@/components/Button';
import Drawer from '@/components/Drawer';
import MobileMenu from '@/components/Menu/MobileMenu';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

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
        icon={<MdMenu />}
        variant="outlined"
        size="small"
        iconSize={24}
        className="max-sm:p-1 px-0 py-0"
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
