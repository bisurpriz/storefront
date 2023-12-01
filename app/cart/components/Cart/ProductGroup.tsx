"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import useCart from "@/store/cart";
import { memo } from "react";
import AccordionItem from "@/components/Accordion/AccordionItem";
import CustomizeGroup from "@/components/Customize/CustomizeGroup";
import { ProductForCart } from "@/common/types/Cart/cart";
import CartSkeleton from "../Skeletons/CartSkeleton";
import QuantityInput from "@/components/NumberInput";

const ProductGroup = ({ products }: { products: ProductForCart[] }) => {
  const { updateItem, removeItem } = useCart();

  const maxXsClasses = {
    image: "max-xs:w-28 max-xs:h-28 flex-1 grow ",
  };
  return (
    <div className=" bg-white border rounded-lg py-[8px] px-[12px]">
      <span className="text-base text-sky-600">
        {products[0].tenant.nickname}
      </span>
      <ul
        role="list"
        className="[&>*]:border-b-[1px] [&>*:last-child]:border-b-0"
      >
        {products.length ? (
          products.map(
            ({
              id,
              name,
              price,
              quantity,
              product_customizable_areas: customize,
            }) => (
              <li className="p-[15px] relative" key={id}>
                <div className="w-[95%] text-base">{name}</div>
                <div className="flex mt-5">
                  <Link href={`/products/${id}`} className="min-w-fit">
                    <Image
                      src="/slider/slider-1.png"
                      alt="image"
                      className={`object-cover aspect-square cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300 ${maxXsClasses.image}`}
                      width={100}
                      height={110}
                      loading="lazy"
                    />
                  </Link>
                  <div className="font-normal text-sm ml-4">
                    <span className="block">
                      Tahmini Teslimat Tarihi: 16 - 17 Ekim
                    </span>
                    <span className="block text-primary">Ücretsiz Kargo</span>
                    <span className="block">{price} TL</span>
                    <QuantityInput
                      value={quantity}
                      onChange={(e, val) => {
                        updateItem({
                          id,
                          quantity: val,
                        });
                      }}
                      min={1}
                      max={20}
                      defaultValue={quantity}
                    />
                  </div>
                </div>
                {customize?.length * quantity > 1
                  ? Array(quantity)
                      .fill(0)
                      .map((_, i) => (
                        <AccordionItem
                          key={i}
                          title={`Özelleştirme Seçenekleri ${i + 1}. Ürün`}
                          className="mt-3 block w-full !bg-2 border-0 rounded-lg"
                          content={
                            <CustomizeGroup
                              key={i}
                              customize={customize}
                              productId={id}
                              index={i}
                              quantity={quantity}
                            />
                          }
                        />
                      ))
                  : null}
                <span
                  className="absolute top-[15px] right-[15px] max-xs:right-0 cursor-pointer"
                  onClick={() => {
                    removeItem(id);
                  }}
                >
                  <AiOutlineClose />
                </span>
              </li>
            )
          )
        ) : (
          <CartSkeleton />
        )}
      </ul>
    </div>
  );
};

export default memo(ProductGroup);
