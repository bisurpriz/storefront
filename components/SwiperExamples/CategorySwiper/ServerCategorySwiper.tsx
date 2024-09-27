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
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";

const ServerCategorySwiper = async () => {
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
    query: GetAllCategoriesDocument,
    fetchPolicy: "cache-first",
  });

  const viewport = await getServerSideViewPort();

  if (category.length < 8 && viewport === "desktop") return null;

  return <CategorySwiper categories={category} />;
};

export default ServerCategorySwiper;
