import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserAddressesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['uuid']['input'];
}>;


export type GetUserAddressesQuery = { user_address: Array<{ address_title: string, address: string, id: number, city: { name: string, id: number }, quarter: { name: string, id: number }, district: { name: string, id: number } }> };


export const GetUserAddressesDocument = gql`
    query getUserAddresses($user_id: uuid!) {
  user_address(where: {user_id: {_eq: $user_id}}) {
    address_title
    address
    id
    city {
      name
      id
    }
    quarter {
      name
      id
    }
    district {
      name
      id
    }
  }
}
    `;

export function useGetUserAddressesQuery(options: Omit<Urql.UseQueryArgs<GetUserAddressesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserAddressesQuery, GetUserAddressesQueryVariables>({ query: GetUserAddressesDocument, ...options });
};