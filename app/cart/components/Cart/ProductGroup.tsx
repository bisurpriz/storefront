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
import { IMAGE_URL } from "@/contants/urls";

const ProductGroup = ({ products }: { products: ProductForCart[] }) => {
  const { updateItem, removeItem } = useCart();

  return (
    <div className=" bg-white border rounded-lg py-4 px-3">
      <span className="text-sm font-semibold text-white p-2 rounded-lg bg-purple-400 font-mono">
        {products[0].tenant.nickname} satıcısından {products.length} Ürün
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
              image_url,
              tenant,
              discount_price,
            }) => (
              <li className="p-[15px] relative" key={id}>
                <div className="flex items-start justify-start gap-8 mt-2">
                  <Image
                    src={`${IMAGE_URL}/${image_url}`}
                    alt="image"
                    className={`object-contain aspect-square w-48 h-48`}
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                  <div className="flex-1 font-mono pr-8">
                    <Link href={`/products/${id}`} className="block w-fit">
                      <h3
                        className="text-xl font-semibold text-gray-800 uppercase w-fit"
                        title={name}
                      >
                        {name}
                      </h3>
                    </Link>

                    <div>
                      {discount_price && (
                        <h6 className="text-base font-semibold text-gray-600 line-through">
                          {discount_price.toFixed(2)} TL
                        </h6>
                      )}
                      <h5 className="text-xl font-bold font-sans text-secondary">
                        {price} TL
                      </h5>
                    </div>
                    <div className="flex items-center justify-start gap-2 mt-2">
                      <span className="text-base font-semibold text-gray-600">
                        Adet:
                      </span>
                      <QuantityInput
                        value={quantity}
                        onChange={(e, quantity) => {
                          updateItem({ id, quantity });
                        }}
                        color="secondary"
                      />
                    </div>
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
                  className="absolute top-4 right-4 max-xs:right-0 cursor-pointer hover:text-red-500 transition-all duration-200 ease-in-out"
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
