"use server";

import { getClient } from "@/graphql/lib/client";
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FOR_CART,
} from "@/graphql/queries/products/getProductById";
import { GET_PRODUCTS_WITH_PAGINATION } from "@/graphql/queries/products/getProductsWithPagination";
import { CartItem } from "@/store/cart";

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
      quantity: data.product.quantity,
    },
    questions: data.product.questions,
    reviews: {
      data: data.product.reviews,
      totalCount: data.product.reviews_aggregate.aggregate.count,
    },
    tenant: {
      id: data.product.tenant.id,
      name: data.product.tenant.firstname + " " + data.product.tenant.lastname,
      rate: 8.2,
    },
    loading,
  };
};

export const getProductsByIdsForCart = async (ids: CartItem[]) => {
  const promiseList = ids.map(({ id }) => {
    return getClient().query({
      query: GET_PRODUCT_FOR_CART,
      variables: {
        id,
      },
    });
  });

  const results = await Promise.all(promiseList);

  const products = results.map(({ data }) => {
    return {
      description: data.product.description,
      id: data.product.id,
      image_url: data.product.image_url,
      name: data.product.name,
      price: data.product.price,
      discountPrice: data.product.discount_price,
      categoryName: data.product.category.name,
      customize: data.product.customize,
      tenantName:
        data.product.tenant.firstname + " " + data.product.tenant.lastname,
      quantity: ids.find((item) => item.id === data.product.id)?.quantity,
    };
  });

  const groupedByTenant = results.reduce((acc: any, { data }) => {
    const tenantId = data.product.tenant.id;

    if (!acc[tenantId]) {
      acc[tenantId] = [];
    }

    acc[tenantId].push({
      description: data.product.description,
      id: data.product.id,
      image_url: data.product.image_url[0],
      name: data.product.name,
      price: data.product.price,
      discountPrice: data.product.discount_price,
      categoryName: data.product.category.name,
      customize: data.product.customize,
      tenantName:
        data.product.tenant.firstname + " " + data.product.tenant.lastname,
      quantity: ids.find((item) => item.id === data.product.id)?.quantity,
    });

    return acc;
  }, {});

  return {
    productsByTenantGroup: groupedByTenant,
    products,
  };
};
