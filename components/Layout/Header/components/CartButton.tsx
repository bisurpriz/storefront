"use client";

import { getCartCount, getCartWithRedis } from "@/app/cart/actions";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const eventSource = new EventSource("/api/cart");
    getCartWithRedis().then(async (data) => {
      const count = await getCartCount(data);
      console.log(count);
      setCount(Number(count));
    });

    eventSource.onmessage = (e) => {
      setCount(Number(e.data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Badge badgeContent={count}>
      <Link href="/cart" className="relative">
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

export default memo(CartButton);
