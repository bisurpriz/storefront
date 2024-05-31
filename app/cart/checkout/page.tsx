import CreditCartForm from "../components/Checkout/CreditCartForm";
import { payment } from "./actions";

export const dynamic = "force-dynamic";

const CartCheckout = async () => {
  const pay = await payment({
    email: "alisahindev@gmail.com",
    payment_amount: 199.9,
    non_3d: false,
    cc_number: "4355084355084358",
    cc_owner: "Ali Şahin",
    cvv: "000",
    expiry_month: "12",
    expiry_year: "30",
    user_address: "İstanbul",
    user_basket: JSON.stringify([
      {
        product_id: 1,
        product_name: "Test Product",
        product_amount: 199.9,
        product_quantity: 1,
        product_price: 199.9,
      },
    ]),
    user_name: "Ali Şahin",
    user_phone: "5555555555",
    card_type: "advantage",
  });

  console.log(pay);
  return (
    <div className="w-full relative">
      <section
        aria-labelledby="cart-checkout"
        aria-describedby="cart-checkout-description"
        aria-label="Ödeme Bilgileri"
      >
        <CreditCartForm />
      </section>
    </div>
  );
};

export default CartCheckout;
