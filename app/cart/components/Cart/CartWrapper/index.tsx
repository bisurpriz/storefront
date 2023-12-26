import CartHomePageButton from "../CartHomePageButton";
import ProductGroup from "../ProductGroup";
import { ProductForCart } from "@/common/types/Cart/cart";

const CartWrapper = ({
  initialCartItems,
}: {
  initialCartItems: ProductForCart[];
}) => {
  const tenantGroupedProducts = initialCartItems?.reduce((acc, item) => {
    const tenantId = item.tenant?.id;
    if (acc[tenantId]) {
      acc[tenantId].push(item);
    } else {
      acc[tenantId] = [item];
    }
    return acc;
  }, {});

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
      <ProductGroup products={tenantGroupedProducts} />
      <CartHomePageButton />
    </div>
  );
};

export default CartWrapper;
