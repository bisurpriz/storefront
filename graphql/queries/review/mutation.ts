import { gql } from '@apollo/client';

const CREATE_REVIEW = gql`
  mutation createReview($comment: String!, $score: Int!, $product_id: Int!) {
    insert_review_one(
      object: { comment: $comment, score: $score, product_id: $product_id }
    ) {
      created_at
    }
  }
`;

export { CREATE_REVIEW };
