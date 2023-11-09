import Button from "@/components/Button";
import ProductGroup from "./ProductGroup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import CartSummary from "./CartSummary";

const CartWrapper = () => {
  return (
    <div className="w-full relative">
      <span className="block text-3xl mb-3">Sepetim</span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <ProductGroup />
          <Link href="/">
            <Button
              icon={<AiOutlineArrowLeft />}
              type="button"
              size="small"
              variant="link"
              className="gap-2 py-0 px-0"
            >
              <span className="font-normal">Alışverişe Devam Et</span>
            </Button>
          </Link>
        </div>
        <div className="sticky bottom-0 col-span-1 md:relative">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartWrapper;
