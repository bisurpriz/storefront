import CreditCartForm from '../components/Checkout/CreditCartForm';

const CartCheckout = async () => {
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
