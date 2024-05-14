"use client";

import { CartStepPaths } from "@/app/cart/constants";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { memo } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = () => {
  const { count } = useCart();

  return (
    <Badge badgeContent={count}>
      <Tooltip text="Sepetim">
        <Link href={CartStepPaths.CART} className="relative">
          <Button
            icon={<AiOutlineShoppingCart />}
            type="button"
            size="small"
            variant="link"
            iconSize={28}
            className={`gap-2 px-0 py-0`}
          />
        </Link>
      </Tooltip>
    </Badge>
  );
};

export default memo(CartButton);
