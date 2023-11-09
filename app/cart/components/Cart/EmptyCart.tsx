import Button from "@/components/Button";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const EmptyCart = () => {
  return (
    <div className="w-full flex justify-between bg-white rounded-lg p-4 border">
      <span className="flex">
        <span className="block text-2xl text-primary p-5 rounded-full w-fit bg-11">
          <AiOutlineShoppingCart />
        </span>
        <span className="flex items-center text-lg font-semibold ml-5">
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

export default EmptyCart;
