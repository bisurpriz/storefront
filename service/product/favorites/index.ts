export const GetUserFavoritesDocument = `
    query getUserFavorites($offset: Int = 0) {
  user_favorite(offset: $offset) {
    id
    product {
      name
      id
      image_url
      price
      discount_price
      slug
      product_categories {
        category {
          name
          slug
        }
      }
    }
  }
  user_favorite_aggregate {
    aggregate {
      count
    }
  }
}
    `;

export const RemoveFromFavoritesDocument = `
    mutation removeFromFavorites($productId: bigint!) {
  delete_user_favorite(where: {product_id: {_eq: $productId}}) {
    affected_rows
  }
}
    `;

export const AddToFavoritesDocument = `
  mutation addToFavorites($productId: bigint!) {
    insert_user_favorite_one(object: { product_id: $productId }) {
      id
    }
  }
`;
