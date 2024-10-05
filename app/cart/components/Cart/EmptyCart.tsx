import { Button } from "@/components/ui/button";
import Basket from "@/components/Icons/Basket";
import { Link } from "@/components/Link";

const EmptyCart = () => {
  return (
    <div className="w-full flex flex-col items-center gap-9 justify-between bg-white rounded-lg py-14 px-8 border">
      <span className="flex">
        <span className="block text-2xl text-primary p-5 rounded-full w-fit bg-green-100">
          <Basket className="text-2xl" />
        </span>
        <span className="flex items-center text-lg font-normal ml-5">
          Sepetinizde ürün bulunmamaktadır.
        </span>
      </span>

      <Button variant="default" onClick={(e) => e.preventDefault()}>
        <Link href="/">Alışverişe Başla</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
