export const GetProductCommentsDocument = `
  query getProductComments($id: bigint!) @cached(ttl: 180) {
    product: product_by_pk(id: $id) {
      reviews {
        id
        comment
        created_at
        score
        user {
          firstname
          lastname
          picture
        }
      }
    }
  }
`;
