import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query GetCategories {
    category {
      id
      image_url
      name
      slug
    }
  }
`;
