"use client";

import { Product } from "@/common/types/Product/product";
import Close from "@/components/Icons/Close";
import InformationCircleFill from "@/components/Icons/InformationCircleFill";
import { useCart } from "@/contexts/CartContext";
import { Popper } from "@mui/base/Popper";
import React from "react";

const ProductGroupListItemInfo = ({
  id,
  customize,
}: {
  id: Product["id"];
  customize: Product["product_customizable_areas"];
}) => {
  const { removeFromCart, loading } = useCart();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <span className="absolute top-2 right-2 flex gap-2 items-center">
      {customize.length ? (
        <>
          <InformationCircleFill
            onMouseLeave={() => setAnchorEl(null)}
            onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
            className="text-gray-500 cursor-pointer transition-all duration-200 ease-in-out w-4 h-4 rounded-full border hover:bg-7 hover:text-white hover:border-7"
          />
          <Popper
            className="w-[300px] rounded-lg"
            placement="top"
            open={open}
            anchorEl={anchorEl}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            <div
              className="p-2 bg-white border rounded-lg shadow-lg"
              onMouseLeave={() => setAnchorEl(null)}
              onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
            >
              <p className="text-xs font-normal font-semibold text-gray-800">
                Bu kısımda satıcının belirlediği ürün özelleştirmeleri yer alır.
                Örneğin ürün üzerine yazı yazdırmak istiyorsanız bu kısımdan
                yazı yazdırabilirsiniz.
              </p>
            </div>
          </Popper>
        </>
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
