export const GetProductReviewsDocument = `
    query getProductReviews($productId: Int, $limit: Int = 10, $offset: Int = 0) {
  review(where: {product_id: {_eq: $productId}}, limit: $limit, offset: $offset) {
    id
    comment
    score
    created_at
    user {
      firstname
      lastname
    }
  }
  review_aggregate {
    aggregate {
      count
    }
  }
}
    `;

export const GetRatingsDocument = `
    query getRatings($pid: bigint!) {
  get_comment_by_score(args: {pid: $pid}) {
    score
    comment_count
  }
}
    `;

export const CreateReviewDocument = `
  mutation createReview($comment: String!, $score: Int!, $product_id: Int!) {
    insert_review_one(
      object: { comment: $comment, score: $score, product_id: $product_id }
    ) {
      created_at
    }
  }
`;
