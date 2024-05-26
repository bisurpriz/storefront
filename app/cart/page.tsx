import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import CartWrapper from "./components/Cart/CartWrapper/index";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sepetim"),
    description: "Sepetim",
  };
};

const Cart = () => {
  return (
    <div
      className="w-full relative"
      aria-label="Sepetim"
      aria-describedby="Sepetim"
    >
      <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
        <CartWrapper />
      </div>
    </div>
  );
};

export default Cart;
