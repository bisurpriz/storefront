import ProductDetailImageGallery from "@/components/Product/DetailImageGallery";
import React from "react";

const ProductImageCarousel = ({
  images,
}: {
  images: {
    id: number;
    url: string;
  }[];
}) => {
  return <ProductDetailImageGallery images={images} />;
};

export default ProductImageCarousel;
