import { getIpAddress } from "@/app/actions";
import CreditCartForm from "../components/Checkout/CreditCartForm";

const CartCheckout = async () => {
  const ip = await getIpAddress();
  return (
    <div className="w-full relative">
      <section
        aria-labelledby="cart-checkout"
        aria-describedby="cart-checkout-description"
        aria-label="Ödeme Bilgileri"
      >
        <CreditCartForm ip={ip} />
      </section>
    </div>
  );
};

export default CartCheckout;
