import { ProductForCart } from "@/common/types/Cart/cart";
import EmptyCart from "../EmptyCart";
import CartItem from "./CartProductItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/components/Link";
import { stringToSlug } from "@/utils/stringToSlug";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForCart[] };
}) => {
  if (!products) return <EmptyCart />;
  const tenantIds = Object.keys(products);

  return tenantIds?.map((id) => (
    <Card key={id}>
      <CardHeader className="mb-4 pb-0 max-sm:mb-3 max-sm:px-2 max-sm:pt-3">
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="w-fit">
            <Link
              href={`/magaza/${stringToSlug(
                products[id][0].tenant.tenants[0].name,
              )}?mid=${products[id][0].tenant.tenants[0].id}`}
              className={cn(
                "inline-block rounded-sm border border-lime-500 bg-lime-50 px-2 py-1",
                "text-xs font-semibold text-lime-500",
              )}
            >
              <h3
                aria-label={`${products[id][0].tenant.tenants[0].name}'e gitmek için tıklayın`}
              >
                {products[id][0].tenant.tenants[0].name}
              </h3>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={10} align="start">
            <p>Gitmek için tıklayın</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="max-sm:px-2 max-sm:pb-2">
        <ul
          key={id}
          role="list"
          aria-label="Sepetimdeki Ürünler"
          className="space-y-3"
        >
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
