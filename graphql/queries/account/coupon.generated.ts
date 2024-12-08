import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllCouponsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCouponsQuery = { coupon: Array<{ id: any, code: string, description?: string | null, created_at?: any | null, start_date?: any | null, end_date?: any | null, minimum_cost?: number | null, left_limit?: number | null, limit: number, amount: number, tenant: { tenants: Array<{ name?: string | null, logo?: string | null, id: any }> } }> };


export const GetAllCouponsDocument = gql`
    query getAllCoupons {
  coupon(
    where: {user_coupons_aggregate: {count: {predicate: {_eq: 0}}}, end_date: {_gte: "now()"}}
  ) {
    id
    code
    description
    created_at
    start_date
    end_date
    minimum_cost
    left_limit
    limit
    amount
    tenant {
      tenants {
        name
        logo
        id
      }
    }
  }
}
    `;
export type GetAllCouponsQueryResult = Apollo.QueryResult<GetAllCouponsQuery, GetAllCouponsQueryVariables>;