import { gql } from "@apollo/client";

const GET_USER_FAVORITES = gql`
  query getUserFavorites($offset: Int = 0) {
    user_favorite(offset: $offset) {
      id
      product {
        name
        id
        image_url
        price
        discount_price
      }
    }
    user_favorite_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const ADD_TO_FAVORITES = gql`
  mutation addToFavorites($productId: bigint!) {
    insert_user_favorite_one(object: { product_id: $productId }) {
      id
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation removeFromFavorites($id: bigint!) {
    delete_user_favorite_by_pk(id: $id) {
      id
    }
  }
`;

export { GET_USER_FAVORITES, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES };
