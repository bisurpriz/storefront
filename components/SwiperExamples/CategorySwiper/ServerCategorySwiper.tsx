import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";
import React from "react";
import CategorySwiper from ".";

const ServerCategorySwiper = async () => {
  const {
    data: { category },
  } = await query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
    query: GetAllCategoriesDocument,
  });

  return <CategorySwiper categories={category} />;
};

export default ServerCategorySwiper;
