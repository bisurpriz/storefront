import Button from "@/components/Button";
import React from "react";
import { MdFavoriteBorder } from "react-icons/md";

const ProductActions = () => {
  return (
    <div className="flex items-center justify-start gap-4 py-4 font-mono">
      <Button
        size="large"
        color="primary"
        className="text-xl pl-16 pr-16 max-sm:w-full"
      >
        Sepete Ekle
      </Button>
      <div className="flex items-end gap-2">
        <Button
          size="large"
          iconSize={28}
          variant="outlined"
          className="group border-red-300 hover:bg-red-400 rounded-xl "
          icon={
            <MdFavoriteBorder className="text-red-300 group-hover:text-white group-hover:animate-bounce" />
          }
        ></Button>
        <p className="text-sm leading-none text-slate-400 mt-0 max-w-[100px] max-lg:hidden">
          <strong>12414</strong> Favori
        </p>
      </div>
    </div>
  );
};

export default ProductActions;
