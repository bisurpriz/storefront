import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetUserAddressesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['uuid']['input'];
}>;


export type GetUserAddressesQuery = { user_address: Array<{ address_title: string, address: string, id: number, city?: string | null, quarter?: string | null, district?: string | null, place_id?: string | null }> };


export const GetUserAddressesDocument = gql`
    query getUserAddresses($user_id: uuid!) {
  user_address(where: {user_id: {_eq: $user_id}}) {
    address_title
    address
    id
    city
    quarter
    district
    place_id
  }
}
    `;
export type GetUserAddressesQueryResult = Apollo.QueryResult<GetUserAddressesQuery, GetUserAddressesQueryVariables>;