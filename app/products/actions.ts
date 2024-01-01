"use server";

import { IProductFilter } from "@/common/types/Filter/productFilter";
import { getClient } from "@/graphql/lib/client";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries/products/getProductById";
import { GET_PRODUCTS_WITH_PAGINATION } from "@/graphql/queries/products/getProductsWithPagination";
import { parseJson } from "@/utils/format";

const client = getClient();

export const getPaginatedProducts = async <T>(params: IProductFilter) => {
  const { data } = await client.query({
    query: GET_PRODUCTS_WITH_PAGINATION,
    variables: {
      ...params,
    },
  });

  return {
    products: data.product.map((product: any) => ({
      ...product,
      totalReviewCount: product.reviews_aggregate.aggregate.count,
    })),
    totalCount: data.product_aggregate.aggregate.count,
  } as T;
};

export const getProductById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  return {
    category: {
      name: data.product.category.name,
    },
    product: {
      description: data.product.description,
      id: data.product.id,
      image_url: data.product.image_url,
      name: data.product.name,
      price: data.product.price,
      is_service_free: data.product.is_service_free,
      delivery_type: data.product.delivery_type,
      quantity: data.product.quantity,
      properties: parseJson(data.product.properties) ?? [],
    },
    questions: data.product.questions,
    reviews: {
      data: data.product.reviews,
      totalCount: data.product.reviews_aggregate.aggregate.count,
    },
    tenant: {
      id: data.product.tenant.id,
      name: data.product.tenant.nickname,
      rate: 8.2,
    },
    loading,
    favorites: {
      data: data.product.user_favorites,
      totalCount: data.product.user_favorites_aggregate.aggregate.count,
    },
  };
};
