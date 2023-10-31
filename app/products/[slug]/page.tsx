import React from "react";
import { getProductsById } from "../actions";
import Image from "next/image";
import { IMAGE_URL } from "@/contants/urls";
import ProductImageCarousel from "./components/Detail/ProductImageCarousel";

const ProductDetail = async ({
  params: { slug },
}: {
  params: { slug: string | number };
}) => {
  const data = await getProductsById({ id: Number(slug) });

  return (
    <div className="h-full">
      <div className="flex items-start justify-start">
        <div className="w-1/2">
          <ProductImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
