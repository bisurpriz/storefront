import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    product_aggregate {
      aggregate {
        count
      }
    }
    product {
      id
      image_url
      description
      name
      price
      quantity
    }
  }
`;
