import { memo } from "react";

import { ProductForCart } from "@/common/types/Cart/cart";

import CartSkeleton from "../../Skeletons/CartSkeleton";
import CartProductGroupListItem from "./CartProductGroupListItem";

const ProductGroup = ({
  products,
  tenantIds,
}: {
  products: { [key: string]: ProductForCart[] };
  tenantIds: string[];
}) => {
  return tenantIds.map((id) => (
    <div className="bg-white" key={id}>
      <span className="text-sm font-semibold text-white p-2 rounded-lg bg-purple-400 font-mono">
        {products[id][0].tenant.nickname} satıcısından {products[id].length}{" "}
        Ürün
      </span>
      <ul key={id} role="list">
        {products[id].length ? (
          products[id].map((product) => (
            <CartProductGroupListItem {...product} key={product.id} />
          ))
        ) : (
          <CartSkeleton />
        )}
      </ul>
    </div>
  ));
};

export default memo(ProductGroup);
