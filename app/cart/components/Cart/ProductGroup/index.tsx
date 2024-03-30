import { ProductForOrder } from "@/common/types/Cart/cart";
import CartProductGroupListItem from "./CartProductGroupListItem";
import EmptyCart from "../EmptyCart";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForOrder[] };
}) => {
  if (!products) return <EmptyCart />;

  const tenantIds = Object.keys(products);

  return tenantIds?.map((id) => (
    <div className="rounded-lg border relative mb-4" key={id}>
      <span className="text-sm font-semibold text-slate-500 py-1 px-2 bg-purple-200 rounded-lg font-mono absolute left-0 top-0 -translate-y-1/2 translate-x-8 max-xs:translate-x-4">
        {products[id][0].tenant?.tenants[0]?.name} satıcısından{" "}
        {products[id].length} Ürün
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
