import React from "react";
import { getProductsById } from "../actions";
import Image from "next/image";
import { IMAGE_URL } from "@/contants/urls";
import ProductImageCarousel from "./components/Detail/ProductImageCarousel";
import ProductInformation from "./components/Detail/ProductInformation";

const ProductDetail = async ({
  params: { slug },
}: {
  params: { slug: string | number };
}) => {
  const data = await getProductsById({ id: Number(slug) });

  return (
    <div className="h-full">
      <div className="flex items-start justify-start max-md:flex-col gap-6">
        <div className="w-1/2 max-md:w-full">
          <ProductImageCarousel />
        </div>
        <div className="w-1/2 max-md:w-full">
          <ProductInformation />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
