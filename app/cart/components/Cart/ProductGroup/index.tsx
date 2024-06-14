import { ProductForCart } from "@/common/types/Cart/cart";
import CartProductGroupListItem from "./CartProductGroupListItem";
import EmptyCart from "../EmptyCart";
import clsx from "clsx";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForCart[] };
}) => {
  if (!products) return <EmptyCart />;
  const tenantIds = Object.keys(products);

  return tenantIds?.map((id) => (
    <div
      className="rounded-lg border relative mt-4 first:mt-0 text-xs"
      key={id}
    >
      <span
        className={clsx(
          "absolute top-0 left-0 bg-primary text-white px-2 py-1 select-none",
          "rounded-tl-lg rounded-br-lg",
          "transform -translate-x-[1px] -translate-y-[1px]",
          "shadow-md",
          "border border-primary",
          "transition-all duration-200"
        )}
      >
        <span className="font-semibold">
          {products[id][0].tenant?.tenants?.[0]?.name ?? "Diğer"}
        </span>{" "}
        satıcısından{" "}
        <span className="font-semibold">
          {products[id].reduce((acc, item) => acc + item.quantity, 0)}
        </span>{" "}
        Ürün
      </span>
      <ul key={id} role="list" aria-label="Sepetimdeki Ürünler">
        {products[id].length &&
          products[id].map((product) => (
            <CartProductGroupListItem {...product} key={product.id} />
          ))}
      </ul>
    </div>
  ));
};

export default ProductGroup;
