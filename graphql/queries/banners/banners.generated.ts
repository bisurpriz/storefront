import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
export type GetBannersQueryResult = Apollo.QueryResult<GetBannersQuery, GetBannersQueryVariables>;