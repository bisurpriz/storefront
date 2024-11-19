import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type SearchProductsQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { product: Array<{ name: string }> };


export const SearchProductsDocument = gql`
    query searchProducts($search: String) {
  product(
    where: {_and: [{_or: [{name: {_ilike: $search}}, {name: {_similar: $search}}, {product_categories: {category: {name: {_similar: $search}}}}]}, {is_active: {_eq: true}}]}
  ) {
    name
  }
}
    `;
export type SearchProductsQueryResult = Apollo.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;