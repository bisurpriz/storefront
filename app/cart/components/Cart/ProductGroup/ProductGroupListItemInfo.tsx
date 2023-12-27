"use client";

import { removeCartItemWithRedis } from "@/app/cart/actions";
import { Product } from "@/common/types/Product/product";
import Popover from "@/components/Popover";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoInformation } from "react-icons/io5";

const ProductGroupListItemInfo = ({
  id,
  customize,
}: {
  id: Product["id"];
  customize: Product["product_customizable_areas"];
}) => {
  return (
    <span className="absolute top-2 right-2 flex gap-2 items-center">
      {customize?.length > 0 ? (
        <Popover
          contentClassName="w-[300px] shadow-md border rounded-sm"
          position="top"
          content={
            <p className="text-xs font-normal text-gray-800">
              Bu kısımda satıcının belirlediği ürün özelleştirmeleri yer alır.
              Örneğin ürün üzerine yazı yazdırmak istiyorsanız bu kısımdan yazı
              yazdırabilirsiniz.
            </p>
          }
        >
          <IoInformation className="text-gray-500 cursor-pointer transition-all duration-200 ease-in-out w-4 h-4 rounded-full border hover:bg-7 hover:text-white hover:border-7" />
        </Popover>
      ) : null}
      <AiOutlineClose
        onClick={() => removeCartItemWithRedis(id)}
        className="cursor-pointer hover:text-7 transition-all duration-200 ease-in-out"
      />
    </span>
  );
};

export default ProductGroupListItemInfo;
