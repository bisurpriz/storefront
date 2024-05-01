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
    <div className="rounded-lg border relative mt-4 first:mt-0" key={id}>
      <span className="text-xs font-semibold bg-5 text-slate-600 py-1 px-2 rounded-lg font-mono absolute left-0 top-0 -translate-y-1/2 translate-x-8 max-xs:translate-x-4">
        {products[id][0].tenant?.tenants?.[0]?.name ?? "Diğer"} satıcısından{" "}
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
