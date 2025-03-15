import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetOrdersWithReviewsQueryVariables = Types.Exact<{
  user_id: Types.Scalars['uuid']['input'];
}>;


export type GetOrdersWithReviewsQuery = { order_item: Array<{ id: any, created_at?: any | null, order_tenant?: { updated_at: any, order_status?: { value: string } | null } | null, product: { slug?: string | null, id: any, name: string, image_url?: Array<string> | null, reviews_aggregate: { aggregate?: { count: number } | null } } }>, review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, product: { slug?: string | null, name: string, id: any, image_url?: Array<string> | null, product_categories: Array<{ category: { name: string, slug?: string | null, id: number } }>, tenant: { id: any, picture?: string | null }, reviews_aggregate: { aggregate?: { count: number } | null } } }> };

export type CreateReviewMutationVariables = Types.Exact<{
  comment: Types.Scalars['String']['input'];
  score: Types.Scalars['Int']['input'];
  product_id: Types.Scalars['Int']['input'];
}>;


export type CreateReviewMutation = { insert_review_one?: { created_at: any } | null };

export type GetProductReviewsQueryVariables = Types.Exact<{
  productId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetProductReviewsQuery = { review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, user?: { firstname?: string | null, lastname?: string | null } | null }>, review_aggregate: { aggregate?: { count: number } | null } };


export const GetOrdersWithReviewsDocument = gql`
    query getOrdersWithReviews($user_id: uuid!) {
  order_item(
    where: {_and: [{product: {reviews: {user_id: {_is_null: true}}}}, {order_tenant: {order_status: {value: {_eq: "Delivered"}}}}]}
  ) {
    id
    order_tenant {
      order_status {
        value
      }
      updated_at
    }
    created_at
    product {
      slug
      id
      name
      image_url
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  review(where: {user_id: {_eq: $user_id}}) {
    id
    comment
    score
    created_at
    product {
      slug
      name
      id
      image_url
      product_categories {
        category {
          name
          slug
          id
        }
      }
      tenant {
        id
        picture
      }
      reviews_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
    `;
export type GetOrdersWithReviewsQueryResult = Apollo.QueryResult<GetOrdersWithReviewsQuery, GetOrdersWithReviewsQueryVariables>;
export const CreateReviewDocument = gql`
    mutation createReview($comment: String!, $score: Int!, $product_id: Int!) {
  insert_review_one(
    object: {comment: $comment, score: $score, product_id: $product_id}
  ) {
    created_at
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetProductReviewsDocument = gql`
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
export type GetProductReviewsQueryResult = Apollo.QueryResult<GetProductReviewsQuery, GetProductReviewsQueryVariables>;