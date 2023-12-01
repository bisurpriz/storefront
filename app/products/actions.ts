"use server";

import { ProductForCart } from "@/common/types/Cart/cart";
import { getClient } from "@/graphql/lib/client";
import {
  GET_PRODUCTS_PRICE_BY_IDS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_FOR_CART,
  ProductForCartResponse,
  ProductPricesResponse,
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

export const getProductsByIdsForCart = async (
  ids: Pick<CartItem, "id" | "quantity">[]
): Promise<{
  productsByTenantGroup: {
    [key: string]: ProductForCart[];
  };
  products: ProductForCart[];
}> => {
  const promiseList = ids.map(({ id }) => {
    return getClient().query<ProductForCartResponse>({
      query: GET_PRODUCT_FOR_CART,
      variables: {
        id,
      },
    });
  });

  let results;

  try {
    results = await Promise.all(promiseList);
  } catch (e) {
    console.log(e);

    return {
      products: [],
      productsByTenantGroup: {},
    };
  }

  const products: ProductForCart[] = results.map(({ data }) => {
    return {
      category: data.category,
      description: data.product.description,
      discount_price: data.product.discount_price,
      id: data.product.id,
      image_url: data.product.image_url[0],
      name: data.product.name,
      price: data.product.price,
      product_customizable_areas: data.product.product_customizable_areas,
      tenant: data.product.tenant,
      quantity: ids.find((item) => item.id === data.product.id)?.quantity,
    };
  });

  const groupedByTenant = products.reduce((acc, product) => {
    const tenantId = product.tenant.nickname;

    if (!acc[tenantId]) {
      acc[tenantId] = [];
    }

    acc[tenantId].push(product);

    return acc;
  }, {});

  return {
    products,
    productsByTenantGroup: groupedByTenant,
  };
};

export const getProductsPricesByIds = async (
  ids: Pick<CartItem, "id">[]
): Promise<{
  total_price: number;
  total_discount_price: number;
  total_discount: number;
}> => {
  const promiseList = ids.map(({ id }) => {
    return getClient().query<ProductPricesResponse>({
      query: GET_PRODUCTS_PRICE_BY_IDS,
      variables: {
        id,
      },
    });
  });

  const results = await Promise.all(promiseList);

  const total_price = results.reduce((acc, { data }) => {
    return acc + data.product.price;
  }, 0);

  const total_discount_price = results.reduce((acc, { data }) => {
    return acc + data.product.discount_price;
  }, 0);

  // positive number
  const total_discount = Math.abs(total_price - total_discount_price);

  return {
    total_price,
    total_discount_price,
    total_discount,
  };
};
