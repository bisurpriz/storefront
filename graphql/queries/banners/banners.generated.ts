import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBannersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBannersQuery = { system_banner: Array<{ expire_date?: any | null, id: any, name?: string | null, path?: string | null, redirect_link: string }> };


export const GetBannersDocument = gql`
    query getBanners @cached {
  system_banner {
    expire_date
    id
    name
    path
    redirect_link
  }
}
    `;

export function useGetBannersQuery(options?: Omit<Urql.UseQueryArgs<GetBannersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBannersQuery, GetBannersQueryVariables>({ query: GetBannersDocument, ...options });
};