"use client";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";

const CartSummary = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="hidden md:block">
        <div className="bg-white border rounded-lg py-[8px] px-[12px]">
          <span className="block text-xl w-full text-center mb-3 font-normal">
            Sipariş Özeti
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm py-1">
              <span>Ara Toplam</span>
              <span className="font-semibold">599.99 TL</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Kargo</span>
              <span className="font-semibold">29.99 TL</span>
            </div>
            <div className="xl:flex xl:justify-between text-sm py-3 mt-1">
              <TextInput
                className="w-full"
                icon={<IoTicketOutline />}
                placeholder="İndirim Kodu Girin"
                id="discount"
              />
              <Button
                size="small"
                color="primary"
                className="flex justify-center w-full xl:w-auto mt-2 xl:mt-0 xl:ml-3"
                label="İndirim Kodu Kullan"
              />
            </div>
            <div className="flex justify-between items-center text-sm border-t-[1px] py-1 mt-1">
              <span className="font-medium">Toplam</span>
              <span className="font-semibold text-xl text-primary ">
                629.99 TL
              </span>
            </div>
          </div>
        </div>
        <Button
          size="large"
          color="primary"
          className="text-xl pl-16 pr-16 w-full mt-5 flex justify-center"
          label="Sepeti Onayla"
        />
      </div>
      <div className="bg-white w-full py-[16px] flex justify-between md:hidden">
        <div className="flex">
          <Button
            icon={<MdKeyboardArrowUp />}
            size="small"
            iconSize={24}
            className="p-[8px]"
            onClick={() => setIsOpen(true)}
          />
          <span className="flex flex-col justify-center ml-2">
            <span className="text-xs">Toplam:</span>
            <span className="text-md text-primary font-medium">629.99 TL</span>
          </span>
        </div>
        <Button
          className="flex justify-center"
          size="small"
          color="primary"
          label="Sepeti Onayla"
        />
      </div>
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
              <span className="font-semibold">599.99 TL</span>
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
                629.99 TL
              </span>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartSummary;
