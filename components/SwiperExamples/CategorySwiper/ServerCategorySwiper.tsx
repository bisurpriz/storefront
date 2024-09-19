import { query } from "@/graphql/lib/client";
import React from "react";
import CategorySwiper from ".";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
} from "@/graphql/queries/categories/getCategories.generated";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/a11y";

const ServerCategorySwiper = async () => {
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
    query: GetAllCategoriesDocument,
    fetchPolicy: "cache-first",
  });

  return <CategorySwiper categories={category} />;
};

export default ServerCategorySwiper;
