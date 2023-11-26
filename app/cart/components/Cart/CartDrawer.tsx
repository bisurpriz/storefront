import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import TextInput from "@/components/TextInput";
import React from "react";

import { IoTicketOutline } from "react-icons/io5";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalPrice: number;
}

const CartDrawer = ({ isOpen, setIsOpen, totalPrice }: CartDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Sipariş Özeti"
      placement="bottom"
      lockScroll={true}
    >
      <div className="bg-white border rounded-lg py-[8px] px-[12px]">
        <div className="flex flex-col">
          <div className="flex justify-between text-sm py-1">
            <span>Ara Toplam</span>
            <span className="font-semibold">{totalPrice} TL</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Kargo</span>
            <span className="font-semibold">29.99 TL</span>
          </div>
          <div className="flex justify-between text-sm py-3 mt-1">
            <TextInput
              className="w-full"
              icon={<IoTicketOutline />}
              placeholder="İndirim Kodu Girin"
              id="discount"
            />
            <Button
              size="small"
              color="primary"
              className="flex justify-center ml-3"
              label="İndirim Kodu Kullan"
            />
          </div>
          <div className="flex justify-between items-center text-sm border-t-[1px] py-1 mt-1">
            <span className="font-medium">Toplam</span>
            <span className="font-semibold text-xl text-primary ">
              {totalPrice} TL
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
