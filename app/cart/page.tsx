import CartWrapper from "./components/Cart/CardWrapper";
/* import EmptyCart from "./components/Cart/EmptyCart"; */

const CartPage = async () => {
  return (
    <div className="h-full">
      <section id="cart" aria-labelledby="cart" aria-describedby="Sepetim">
        {/* <EmptyCart /> */}
        <CartWrapper />
      </section>
    </div>
  );
};

export default CartPage;
