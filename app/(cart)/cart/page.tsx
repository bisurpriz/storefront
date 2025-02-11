import { getBrandWithTitle } from "@/utils/getBrandWithTitle";
import CartWrapper from "./components/Cart/CartWrapper/index";

export const generateMetadata = async () => {
  return {
    title: getBrandWithTitle("Sepetim"),
    description: "Sepetim",
  };
};

const Cart = async () => {
  return (
    <section
      aria-label="Sepetim"
      aria-describedby="Sepetim"
      className="relative col-span-1 flex w-full flex-col gap-3 md:col-span-2"
    >
      <CartWrapper />
    </section>
  );
};

export default Cart;
