import { getPaginatedProducts } from "@/app/(feed)/actions";
import { PER_REQUEST } from "@/app/constants";
import RecommendedProducts from "@/components/RecommendedProducts";
import React, { FC } from "react";

type Props = {
  params: {
    [key: string]: string;
  };
};

const ProductRecommendedPage: FC<Props> = async ({ params }) => {
  const { products: categoryProducts } = await getPaginatedProducts({
    offset: 0,
    category_slug: params["category-slug"],
    limit: PER_REQUEST,
  });

  return <RecommendedProducts products={categoryProducts} />;
};

export default ProductRecommendedPage;
