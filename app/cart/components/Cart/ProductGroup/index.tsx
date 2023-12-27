import { ProductForCart } from "@/common/types/Cart/cart";
import CartProductGroupListItem from "./CartProductGroupListItem";
import EmptyCart from "../EmptyCart";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForCart[] };
}) => {
  if (!products) return <EmptyCart />;

  const tenantIds = Object.keys(products);

  return tenantIds?.map((id) => (
    <div className="bg-white" key={id}>
      <span className="text-sm font-semibold text-white p-1 rounded-lg bg-purple-400 font-mono">
        {products[id][0].tenant.nickname} satıcısından {products[id].length}{" "}
        Ürün
      </span>
      <ul key={id} role="list">
        {products[id].length &&
          products[id].map((product) => (
            <CartProductGroupListItem {...product} key={product.id} />
          ))}
      </ul>
    </div>
  ));
};

export default ProductGroup;
