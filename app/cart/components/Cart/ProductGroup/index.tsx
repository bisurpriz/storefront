import { ProductForCart } from "@/common/types/Cart/cart";
import { Link } from "@/components/Link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { stringToSlug } from "@/utils/stringToSlug";
import { motion } from "framer-motion";
import { Package2, Store } from "lucide-react";
import EmptyCart from "../EmptyCart";
import CartItem from "./CartProductItem";

const ProductGroup = ({
  products,
}: {
  products: { [key: string]: ProductForCart[] };
}) => {
  if (!products) return <EmptyCart />;

  const tenantIds = Object.keys(products);

  return tenantIds?.map((id, index) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      key={id}
    >
      <Card className="group relative mb-4 overflow-hidden border-neutral-200 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-lime-500 hover:shadow-lg">
        <CardHeader className="space-y-2 border-b border-neutral-100 bg-neutral-50/80 pb-4 pt-4 backdrop-blur-sm max-sm:px-3 max-sm:pt-3">
          <div className="flex items-center justify-between">
            <Tooltip delayDuration={50}>
              <TooltipTrigger className="w-fit">
                <Link
                  href={`/magaza/${stringToSlug(
                    products[id][0].tenant.tenants[0].name,
                  )}?mid=${products[id][0].tenant.tenants[0].id}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 border-lime-500 bg-white px-4 py-2",
                    "text-sm font-medium text-lime-700 transition-all duration-200",
                    "hover:bg-lime-50 hover:shadow-sm active:scale-95",
                  )}
                >
                  <Store className="h-4 w-4" />
                  <h3
                    aria-label={`${products[id][0].tenant.tenants[0].name}'e gitmek için tıklayın`}
                  >
                    {products[id][0].tenant.tenants[0].name}
                  </h3>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" align="start" className="bg-lime-50">
                <p className="text-xs text-lime-700">Mağazaya git</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
              <Package2 className="h-3.5 w-3.5" />
              <span>{products[id].length} Ürün</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="divide-y divide-neutral-100/80 p-4 max-sm:px-3 max-sm:pb-3">
          <ul role="list" aria-label="Sepetimdeki Ürünler">
            {products[id].length &&
              products[id].map((product, productIndex) => (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + productIndex * 0.05 }}
                  key={product.id}
                  className="py-3 first:pt-0 last:pb-0"
                >
                  <CartItem {...product} />
                </motion.li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  ));
};

export default ProductGroup;
