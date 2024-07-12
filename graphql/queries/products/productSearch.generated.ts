import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchProductsQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { product: Array<{ name: string }> };


export const SearchProductsDocument = gql`
    query searchProducts($search: String) {
  product(
    where: {_and: [{_or: [{name: {_ilike: $search}}, {name: {_similar: $search}}, {category: {name: {_similar: $search}}}, {category: {name: {_ilike: $search}}}]}, {is_active: {_eq: true}}]}
  ) {
    name
  }
}
    `;

export function useSearchProductsQuery(options?: Omit<Urql.UseQueryArgs<SearchProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchProductsQuery, SearchProductsQueryVariables>({ query: SearchProductsDocument, ...options });
};