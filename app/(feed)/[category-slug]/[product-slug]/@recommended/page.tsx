import { getPaginatedProducts } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import RecommendedProducts from "@/components/RecommendedProducts";
import React, { FC } from "react";
import RecommendedProductsLoadingPage from "./loading";
import { PageProps } from "@/.next/types/app/page";

const ProductRecommendedPage: FC<PageProps> = async (props) => {
  const params = await props.params;
  const { products: categoryProducts } = await getPaginatedProducts({
    offset: 0,
    category_slug: params["category-slug"],
    limit: PER_REQUEST,
  });

  if (!categoryProducts) {
    return <RecommendedProductsLoadingPage />;
  }

  return <RecommendedProducts products={categoryProducts} />;
};

export default ProductRecommendedPage;
