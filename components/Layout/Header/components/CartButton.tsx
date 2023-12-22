"use client";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import useCart from "@/store/cart";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = () => {
  const { count } = useCart();

  return (
    <Badge badgeContent={count}>
      <Link href="/cart">
        <Button
          icon={<AiOutlineShoppingCart />}
          type="button"
          size="small"
          variant="link"
          iconSize={24}
          className={`gap-2 py-0 px-0`}
        >
          <span className="max-xl:hidden font-normal">Sepetim</span>
        </Button>
      </Link>
    </Badge>
  );
};

export default CartButton;
