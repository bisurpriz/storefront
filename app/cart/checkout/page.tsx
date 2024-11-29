import CreditCardForm from "../components/Checkout/CreditCardForm";

const CartCheckout = async () => {
  return (
    <div className="relative w-full">
      <section
        aria-labelledby="cart-checkout"
        aria-describedby="cart-checkout-description"
        aria-label="Ödeme Bilgileri"
      >
        <CreditCardForm />
      </section>
    </div>
  );
};

export default CartCheckout;
