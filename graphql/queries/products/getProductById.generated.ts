import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetProductByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['bigint']['input']>;
}>;


export type GetProductByIdQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, quantity?: number | null, is_service_free?: boolean | null, delivery_time_ranges?: any | null, delivery_type?: Types.Delivery_Type_Enum | null, properties?: any | null, discount_price?: number | null, category: { name: string, id: number, slug?: string | null }, questions: Array<{ created_at: any, id: any, question: string, updated_at: any, user: { firstname?: string | null, lastname?: string | null } }>, reviews: Array<{ id: number, comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null, picture?: string | null, id: any } }>, product_customizable_areas: Array<{ customizable_area: { id: number, type: string } }>, reviews_aggregate: { aggregate?: { count: number } | null }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, user_favorites: Array<{ user_id?: any | null, id: any }>, user_favorites_aggregate: { aggregate?: { count: number } | null } } | null };

export type GetProductForCartQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['bigint']['input']>;
}>;


export type GetProductForCartQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, discount_price?: number | null, product_customizable_areas: Array<{ count: number, customizable_area: { type: string } }>, category: { name: string }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> } } | null, category: Array<{ name: string }> };

export type GetProductPricesByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['bigint']['input']>;
}>;


export type GetProductPricesByIdQuery = { product?: { id: any, price: number, discount_price?: number | null } | null };

export type GetProductsForInitialCartQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['bigint']['input']> | Types.Scalars['bigint']['input']>;
}>;


export type GetProductsForInitialCartQuery = { product: Array<{ name: string, description?: string | null, id: any, price: number, discount_price?: number | null, stock?: number | null, image_url?: Array<string> | null, category: { id: number, name: string, slug?: string | null }, tenant: { id: any, tenants: Array<{ id: any, name?: string | null, logo?: string | null, iyzi_sub_merchant_key?: string | null, commision_rate?: number | null }> }, product_customizable_areas: Array<{ count: number, max_character?: number | null, customizable_area: { id: number, type: string } }> }> };

export type GetProductActionDataQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductActionDataQuery = { product?: { user_favorites_aggregate: { aggregate?: { count: number } | null }, user_favorites: Array<{ product_id: any }> } | null };

export type GetProductActionDataForAnonymousQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductActionDataForAnonymousQuery = { product?: { user_favorites_aggregate: { aggregate?: { count: number } | null } } | null };

export type GetProductInformationQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductInformationQuery = { product?: { description?: string | null, id: any, image_url?: Array<string> | null, name: string, price: number, is_service_free?: boolean | null, delivery_time_ranges?: any | null, delivery_type?: Types.Delivery_Type_Enum | null, properties?: any | null, discount_price?: number | null, reviews_aggregate: { aggregate?: { count: number, avg?: { score?: number | null } | null } | null }, tenant: { tenants: Array<{ name?: string | null, id: any }> } } | null };

export type GetProductImagesQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductImagesQuery = { product?: { image_url?: Array<string> | null } | null };

export type GetProductDescriptionQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductDescriptionQuery = { product?: { description?: string | null, properties?: any | null } | null };

export type GetProductCommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['bigint']['input'];
}>;


export type GetProductCommentsQuery = { product?: { reviews: Array<{ id: number, comment?: string | null, created_at: any, score?: number | null, user: { firstname?: string | null, lastname?: string | null, picture?: string | null } }> } | null };


export const GetProductByIdDocument = gql`
    query getProductById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    category {
      name
    }
    description
    id
    image_url
    name
    price
    quantity
    is_service_free
    delivery_time_ranges
    delivery_type
    properties
    discount_price
    questions {
      created_at
      id
      question
      updated_at
      user {
        firstname
        lastname
      }
    }
    reviews {
      id
      comment
      created_at
      score
      user {
        firstname
        lastname
        picture
        id
      }
    }
    product_customizable_areas {
      customizable_area {
        id
        type
      }
    }
    reviews_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    category {
      name
      id
      slug
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    user_favorites {
      user_id
      id
    }
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetProductForCartDocument = gql`
    query getProductForCart($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    discount_price
    product_customizable_areas {
      customizable_area {
        type
      }
      count
    }
    category {
      name
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
  }
  category {
    name
  }
}
    `;
export type GetProductForCartQueryResult = Apollo.QueryResult<GetProductForCartQuery, GetProductForCartQueryVariables>;
export const GetProductPricesByIdDocument = gql`
    query getProductPricesById($id: bigint = 0) {
  product: product_by_pk(id: $id) {
    id
    price
    discount_price
  }
}
    `;
export type GetProductPricesByIdQueryResult = Apollo.QueryResult<GetProductPricesByIdQuery, GetProductPricesByIdQueryVariables>;
export const GetProductsForInitialCartDocument = gql`
    query getProductsForInitialCart($ids: [bigint!]) {
  product(where: {id: {_in: $ids}, is_active: {_eq: true}}) {
    name
    description
    id
    price
    discount_price
    stock
    image_url
    category {
      id
      name
      slug
    }
    tenant {
      id
      tenants {
        id
        name
        logo
        iyzi_sub_merchant_key
        commision_rate
      }
    }
    product_customizable_areas {
      customizable_area {
        id
        type
      }
      count
      max_character
    }
  }
}
    `;
export type GetProductsForInitialCartQueryResult = Apollo.QueryResult<GetProductsForInitialCartQuery, GetProductsForInitialCartQueryVariables>;
export const GetProductActionDataDocument = gql`
    query getProductActionData($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
    user_favorites(where: {product: {id: {_eq: $id}}}) {
      product_id
    }
  }
}
    `;
export type GetProductActionDataQueryResult = Apollo.QueryResult<GetProductActionDataQuery, GetProductActionDataQueryVariables>;
export const GetProductActionDataForAnonymousDocument = gql`
    query getProductActionDataForAnonymous($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    user_favorites_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;
export type GetProductActionDataForAnonymousQueryResult = Apollo.QueryResult<GetProductActionDataForAnonymousQuery, GetProductActionDataForAnonymousQueryVariables>;
export const GetProductInformationDocument = gql`
    query getProductInformation($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    description
    id
    image_url
    name
    price
    is_service_free
    delivery_time_ranges
    delivery_type
    properties
    discount_price
    reviews_aggregate {
      aggregate {
        count(columns: id)
        avg {
          score
        }
      }
    }
    tenant {
      tenants {
        name
        id
      }
    }
  }
}
    `;
export type GetProductInformationQueryResult = Apollo.QueryResult<GetProductInformationQuery, GetProductInformationQueryVariables>;
export const GetProductImagesDocument = gql`
    query getProductImages($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    image_url
  }
}
    `;
export type GetProductImagesQueryResult = Apollo.QueryResult<GetProductImagesQuery, GetProductImagesQueryVariables>;
export const GetProductDescriptionDocument = gql`
    query getProductDescription($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    description
    properties
  }
}
    `;
export type GetProductDescriptionQueryResult = Apollo.QueryResult<GetProductDescriptionQuery, GetProductDescriptionQueryVariables>;
export const GetProductCommentsDocument = gql`
    query getProductComments($id: bigint!) @cached(ttl: 180) {
  product: product_by_pk(id: $id) {
    reviews {
      id
      comment
      created_at
      score
      user {
        firstname
        lastname
        picture
      }
    }
  }
}
    `;
export type GetProductCommentsQueryResult = Apollo.QueryResult<GetProductCommentsQuery, GetProductCommentsQueryVariables>;