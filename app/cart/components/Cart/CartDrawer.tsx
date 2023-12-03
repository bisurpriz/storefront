import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import TextField from "@/components/TextField";
import React from "react";

import { IoTicketOutline } from "react-icons/io5";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  totalPrice: number;
  totalDiscountPrice: number;
  totalDiscount: number;
}

const CartDrawer = ({
  isOpen,
  setIsOpen,
  totalPrice,
  totalDiscount,
  totalDiscountPrice,
}: CartDrawerProps) => {
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
            <span className="font-semibold">{totalDiscountPrice} TL</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span>Kargo</span>
            <span className="font-semibold">29.99 TL</span>
          </div>
          {totalDiscount ? (
            <>
              <div className="flex justify-between text-slate-100 mt-4 text-sm p-2 bg-red-300 rounded-md">
                <span>Toplam kazancınız</span>
                <span className="font-semibold">
                  {totalDiscount.toFixed(2)} TL{" "}
                </span>
              </div>
            </>
          ) : null}
          <div className="flex justify-between text-sm py-3 mt-1">
            <TextField
              icon={<IoTicketOutline />}
              placeholder="İndirim Kodu Girin"
              id="discount"
              fullWidth
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
              {totalPrice.toFixed(2)} TL
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
