"use client";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const eventSource = new EventSource("/api/cart");

    eventSource.onmessage = (e) => {
      setCount(Number(e.data));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Badge badgeContent={count}>
      <Tooltip text='Sepetim'>
        <Link href='/cart' className='relative'>
          <Button
            icon={<AiOutlineShoppingCart />}
            type='button'
            size='small'
            variant='link'
            iconSize={28}
            className={`gap-2 px-0 py-0`}
          />
        </Link>
      </Tooltip>
    </Badge>
  );
};

export default memo(CartButton);
