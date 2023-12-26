import { getRedisProducts } from "./actions";
import CartWrapper from "./components/Cart/CartWrapper/index";

const Cart = async () => {
  const cartData = await getRedisProducts();

  return (
    <div
      className="w-full relative"
      aria-label="Sepetim"
      aria-describedby="Sepetimdeki ürünlerin listesi"
    >
      <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
        <CartWrapper initialCartItems={cartData} />
      </div>
    </div>
  );
};

export default Cart;
