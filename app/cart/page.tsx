import CartWrapper from "./components/Cart/CartWrapper/index";

const Cart = async () => {
  return (
    <div
      className="w-full relative"
      aria-label="Sepetim"
      aria-describedby="Sepetimdeki ürünlerin listesi"
    >
      <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
        <CartWrapper />
      </div>
    </div>
  );
};

export default Cart;
