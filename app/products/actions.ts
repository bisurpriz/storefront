"use server";

import { getClient } from "@/graphql/lib/client";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/products/getProductById";
import { GET_PRODUCTS_WITH_PAGINATION } from "@/graphql/queries/products/getProductsWithPagination";

export const getPaginatedProducts = async <T>({
  offset,
}: {
  offset: number;
}) => {
  const { data } = await getClient().query({
    query: GET_PRODUCTS_WITH_PAGINATION,
    variables: {
      offset,
    },
  });

  return {
    products: data.product,
    totalCount: data.product_aggregate.aggregate.count,
  } as T;
};

export const getProductById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await getClient().query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id,
    },
  });

  return {
    category: {
      name: data.product_by_pk.category.name,
    },
    product: {
      description: data.product_by_pk.description,
      id: data.product_by_pk.id,
      image_url: data.product_by_pk.image_url,
      name: data.product_by_pk.name,
      price: data.product_by_pk.price,
      quantity: data.product_by_pk.quantity,
    },
    questions: data.product_by_pk.questions,
    reviews: {
      data: data.product_by_pk.reviews,
      totalCount: data.product_by_pk.reviews_aggregate.aggregate.count,
    },
    loading,
  };
};
