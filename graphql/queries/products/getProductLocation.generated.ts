import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetProductDeliveryCitiesQueryVariables = Types.Exact<{
  product_id: Types.Scalars['bigint']['input'];
}>;


export type GetProductDeliveryCitiesQuery = { get_product_delivery_cities: Array<{ city_code?: number | null, city_name?: string | null, id?: number | null }> };


export const GetProductDeliveryCitiesDocument = gql`
    query getProductDeliveryCities($product_id: bigint!) {
  get_product_delivery_cities(args: {product_id: $product_id}) {
    city_code
    city_name
    id
  }
}
    `;
export type GetProductDeliveryCitiesQueryResult = Apollo.QueryResult<GetProductDeliveryCitiesQuery, GetProductDeliveryCitiesQueryVariables>;