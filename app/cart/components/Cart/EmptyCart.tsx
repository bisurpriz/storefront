import Button from "@/components/Button";
import Link from "next/link";
import { memo } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EmptyCart = () => {
  return (
    <div className="w-full flex flex-col items-center gap-9 justify-between bg-white rounded-lg py-14 px-8 border">
      <span className="flex">
        <span className="block text-2xl text-primary p-5 rounded-full w-fit bg-1">
          <AiOutlineShoppingCart className="text-2xl" />
        </span>
        <span className="flex items-center text-lg font-normal ml-5">
          Sepetinizde ürün bulunmamaktadır.
        </span>
      </span>
      <Link href="/">
        <Button
          className="font-semibold text-lg"
          label="Alışverişe Başla"
          color="primary"
        />
      </Link>
    </div>
  );
};

export default memo(EmptyCart);
