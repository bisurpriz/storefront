import CartWrapper from "./components/Cart/Cart";

const CartPage = async () => {
  return (
    <div className="h-full">
      <section id="cart" aria-labelledby="cart" aria-describedby="Sepetim">
        <CartWrapper />
      </section>
    </div>
  );
};

export default CartPage;
