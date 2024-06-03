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
    <section
      aria-label="Sepetim"
      aria-describedby="Sepetim"
      className="w-full relative col-span-1 md:col-span-2 flex flex-col gap-3"
    >
      <CartWrapper />
    </section>
  );
};

export default Cart;
