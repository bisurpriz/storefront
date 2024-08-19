"use client";

import { Product } from "@/common/types/Product/product";
import Close from "@/components/Icons/Close";
import InformationCircleFill from "@/components/Icons/InformationCircleFill";
import Popover from "@/components/Popover";
import { useCart } from "@/contexts/CartContext";
import React from "react";

const ProductGroupListItemInfo = ({
  id,
  customize,
}: {
  id: Product["id"];
  customize: Product["product_customizable_areas"];
}) => {
  const { removeFromCart, loading } = useCart();

  return (
    <span className="absolute top-2 right-2 flex gap-2 items-center">
      {customize.length ? (
        <Popover
          className="w-[300px] rounded-lg"
          placement="top"
          trigger="hover"
          content={
            <p className="text-xs font-normal text-gray-800">
              Bu kısımda satıcının belirlediği ürün özelleştirmeleri yer alır.
              Örneğin ürün üzerine yazı yazdırmak istiyorsanız bu kısımdan yazı
              yazdırabilirsiniz.
            </p>
          }
        >
          <InformationCircleFill className="text-gray-500 cursor-pointer transition-all duration-200 ease-in-out w-4 h-4 rounded-full border hover:bg-7 hover:text-white hover:border-7" />
        </Popover>
      ) : null}
      <Close
        onClick={() => {
          if (loading) return;
          removeFromCart(id);
        }}
        className="cursor-pointer hover:text-7 transition-all duration-200 ease-in-out"
      />
    </span>
  );
};

export default ProductGroupListItemInfo;
