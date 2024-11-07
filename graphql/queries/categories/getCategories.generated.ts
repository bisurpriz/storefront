import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type GetMainCategoriesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetMainCategoriesQuery = {
  category: Array<{
    id: number;
    image_url?: string | null;
    name: string;
    slug?: string | null;
  }>;
};

export type GetAllCategoriesQueryVariables = Types.Exact<{
  parent_category_id?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type GetAllCategoriesQuery = {
  category: Array<{
    id: number;
    image_url?: string | null;
    name: string;
    slug?: string | null;
  }>;
};

export const GetMainCategoriesDocument = gql`
  query getMainCategories {
    category(where: { parent_category_id: { _is_null: true } }) {
      id
      image_url
      name
      slug
    }
  }
`;
export type GetMainCategoriesQueryResult = Apollo.QueryResult<
  GetMainCategoriesQuery,
  GetMainCategoriesQueryVariables
>;
export const GetAllCategoriesDocument = gql`
  query getAllCategories($parent_category_id: Int) {
    category(where: { parent_category_id: { _eq: $parent_category_id } }) {
      id
      image_url
      name
      slug
    }
  }
`;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables
>;
