import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetProductsWithPaginationQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  is_active?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  category_slug?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetProductsWithPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, tenant_id: any, description?: string | null, name: string, slug?: string | null, image_url?: Array<string> | null, price: number, quantity?: number | null, properties?: any | null, discount_price?: number | null, category: { name: string, slug?: string | null }, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, reviews_aggregate: { aggregate?: { count: number } | null } }> };

export type GetProductsWithFilteredPaginationQueryVariables = Types.Exact<{
  filter_payload?: Types.InputMaybe<Types.Product_Bool_Exp>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetProductsWithFilteredPaginationQuery = { product_aggregate: { aggregate?: { count: number } | null }, product: Array<{ id: any, tenant_id: any, description?: string | null, name: string, slug?: string | null, image_url?: Array<string> | null, price: number, quantity?: number | null, properties?: any | null, discount_price?: number | null, category: { name: string, slug?: string | null }, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, reviews_aggregate: { aggregate?: { count: number } | null } }> };


export const GetProductsWithPaginationDocument = gql`
    query getProductsWithPagination($limit: Int = 15, $offset: Int = 0, $is_active: Boolean = true, $category_slug: String) {
  product_aggregate(
    where: {is_active: {_eq: $is_active}, category: {slug: {_eq: $category_slug}}}
  ) {
    aggregate {
      count
    }
  }
  product(
    limit: $limit
    offset: $offset
    where: {is_active: {_eq: $is_active}, category: {slug: {_eq: $category_slug}}}
  ) {
    id
    tenant_id
    description
    name
    slug
    category {
      name
      slug
    }
    image_url
    price
    quantity
    properties
    discount_price
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export type GetProductsWithPaginationQueryResult = Apollo.QueryResult<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>;
export const GetProductsWithFilteredPaginationDocument = gql`
    query getProductsWithFilteredPagination($filter_payload: product_bool_exp, $limit: Int = 10, $offset: Int = 0) {
  product_aggregate(where: $filter_payload) {
    aggregate {
      count
    }
  }
  product(
    where: $filter_payload
    limit: $limit
    offset: $offset
    order_by: {id: asc}
  ) {
    id
    tenant_id
    description
    name
    slug
    category {
      name
      slug
    }
    image_url
    price
    quantity
    slug
    properties
    discount_price
    product_customizable_areas {
      count
      customizable_area {
        type
      }
    }
    tenant {
      id
      tenants {
        name
        logo
        id
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    reviews_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export type GetProductsWithFilteredPaginationQueryResult = Apollo.QueryResult<GetProductsWithFilteredPaginationQuery, GetProductsWithFilteredPaginationQueryVariables>;