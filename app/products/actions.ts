'use server';

import { IProductFilter } from '@/common/types/Filter/productFilter';
import { GetProductByIdDocument, GetProductByIdQuery, GetProductsWithPaginationDocument, GetProductsWithPaginationQuery } from '@/graphql/generated';
import { getClient } from '@/graphql/lib/client';
import { parseJson } from '@/utils/format';

const client = getClient();

export const getPaginatedProducts = async (params: IProductFilter) => {
  const { data } = await client.query<GetProductsWithPaginationQuery>({
    query: GetProductsWithPaginationDocument,
    variables: {
      ...params,
    },
  });


  return {
    products: data.product,
    totalCount: data.product_aggregate.aggregate.count,
  };
};

export const getProductById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await client.query<GetProductByIdQuery>({
    query: GetProductByIdDocument,
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
      id: data.product.tenant.tenants[0]?.id,
      name: data.product.tenant.tenants[0]?.name,
      rate: 8.2,
      logo: data.product.tenant.tenants[0]?.logo,
    },
    loading,
    favorites: {
      data: data.product.user_favorites,
      totalCount: data.product.user_favorites_aggregate.aggregate.count,
    },
  };
};
