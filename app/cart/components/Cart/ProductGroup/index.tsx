import { ProductForCart } from "@/common/types/Cart/cart";
import CartProductGroupListItem from "./CartProductGroupListItem";
import EmptyCart from "../EmptyCart";
import clsx from "clsx";
import CartItem from "./CartProductItem";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForCart[] };
}) => {
  if (!products) return <EmptyCart />;
  const tenantIds = Object.keys(products);

  return tenantIds?.map((id) => (
    <Card key={id}>
      <CardHeader className="pb-0 mb-4 max-sm:px-2 max-sm:pt-3 max-sm:mb-3">
        <h3 className="text-sm text-gray-500">
          {products[id][0].tenant.tenants[0].name}
        </h3>
      </CardHeader>
      <CardContent className="max-sm:px-2 max-sm:pb-2">
        <ul key={id} role="list" aria-label="Sepetimdeki Ürünler">
          {products[id].length &&
            products[id].map((product) => (
              <CartItem {...product} key={product.id} />
            ))}
        </ul>
      </CardContent>
    </Card>
  ));
};

export default ProductGroup;
