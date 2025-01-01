import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetVendorByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
}>;


export type GetVendorByIdQuery = { tenant_by_pk?: { id: any, name?: string | null, logo?: string | null, legal_company_title?: string | null, created_at: any, owner: { products_aggregate: { aggregate?: { count: number } | null }, reviews_aggregate: { aggregate?: { count: number } | null } } } | null };

export type GetVendorReviewsQueryVariables = Types.Exact<{
  tenant_id: Types.Scalars['uuid']['input'];
}>;


export type GetVendorReviewsQuery = { review_aggregate: { aggregate?: { count: number } | null } };

export type GetVendorProductScoreAverageQueryVariables = Types.Exact<{
  tenant_id: Types.Scalars['uuid']['input'];
}>;


export type GetVendorProductScoreAverageQuery = { product_aggregate: { aggregate?: { avg?: { score?: number | null } | null } | null } };

export type GetVendorCouponsQueryVariables = Types.Exact<{
  tenant_id: Types.Scalars['uuid']['input'];
}>;


export type GetVendorCouponsQuery = { coupon_aggregate: { aggregate?: { count: number } | null }, coupon: Array<{ id: any, code: string, start_date?: any | null, end_date?: any | null, amount: number, left_limit?: number | null, minimum_cost?: number | null, limit: number }> };


export const GetVendorByIdDocument = gql`
    query getVendorById($id: uuid!) {
  tenant_by_pk(id: $id) {
    id
    name
    logo
    legal_company_title
    created_at
    owner {
      products_aggregate {
        aggregate {
          count
        }
      }
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
    `;
export type GetVendorByIdQueryResult = Apollo.QueryResult<GetVendorByIdQuery, GetVendorByIdQueryVariables>;
export const GetVendorReviewsDocument = gql`
    query getVendorReviews($tenant_id: uuid!) {
  review_aggregate(where: {product: {tenant: {tenants: {id: {_eq: $tenant_id}}}}}) {
    aggregate {
      count
    }
  }
}
    `;
export type GetVendorReviewsQueryResult = Apollo.QueryResult<GetVendorReviewsQuery, GetVendorReviewsQueryVariables>;
export const GetVendorProductScoreAverageDocument = gql`
    query getVendorProductScoreAverage($tenant_id: uuid!) {
  product_aggregate(where: {tenant: {tenants: {id: {_eq: $tenant_id}}}}) {
    aggregate {
      avg {
        score
      }
    }
  }
}
    `;
export type GetVendorProductScoreAverageQueryResult = Apollo.QueryResult<GetVendorProductScoreAverageQuery, GetVendorProductScoreAverageQueryVariables>;
export const GetVendorCouponsDocument = gql`
    query getVendorCoupons($tenant_id: uuid!) {
  coupon_aggregate(where: {tenant: {tenants: {id: {_eq: $tenant_id}}}}) {
    aggregate {
      count
    }
  }
  coupon {
    id
    code
    start_date
    end_date
    amount
    left_limit
    code
    minimum_cost
    limit
  }
}
    `;
export type GetVendorCouponsQueryResult = Apollo.QueryResult<GetVendorCouponsQuery, GetVendorCouponsQueryVariables>;