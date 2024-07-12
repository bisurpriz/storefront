import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetOrdersWithReviewsQueryVariables = Types.Exact<{
  user_id: Types.Scalars['uuid']['input'];
}>;


export type GetOrdersWithReviewsQuery = { order_item: Array<{ id: any, created_at?: any | null, order_tenant?: { updated_at: any, order_status?: { value: string } | null } | null, product: { slug?: string | null, id: any, name: string, image_url?: Array<string> | null, reviews_aggregate: { aggregate?: { count: number } | null } } }>, review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, product: { slug?: string | null, name: string, id: any, image_url?: Array<string> | null, category: { name: string, slug?: string | null, id: number }, tenant: { id: any, picture?: string | null }, reviews_aggregate: { aggregate?: { count: number } | null } } }> };

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


export type GetProductReviewsQuery = { review: Array<{ id: number, comment?: string | null, score?: number | null, created_at: any, user: { firstname?: string | null, lastname?: string | null } }>, review_aggregate: { aggregate?: { count: number } | null } };


export const GetOrdersWithReviewsDocument = gql`
    query getOrdersWithReviews($user_id: uuid!) {
  order_item(
    where: {_and: [{product: {_or: [{reviews_aggregate: {count: {predicate: {_eq: 0}}}}, {reviews: {user_id: {_neq: $user_id}}}]}}, {order_tenant: {order_status: {value: {_eq: "Delivered"}}}}]}
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
      category {
        name
        slug
        id
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

export function useGetOrdersWithReviewsQuery(options: Omit<Urql.UseQueryArgs<GetOrdersWithReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrdersWithReviewsQuery, GetOrdersWithReviewsQueryVariables>({ query: GetOrdersWithReviewsDocument, ...options });
};
export const CreateReviewDocument = gql`
    mutation createReview($comment: String!, $score: Int!, $product_id: Int!) {
  insert_review_one(
    object: {comment: $comment, score: $score, product_id: $product_id}
  ) {
    created_at
  }
}
    `;

export function useCreateReviewMutation() {
  return Urql.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument);
};
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

export function useGetProductReviewsQuery(options?: Omit<Urql.UseQueryArgs<GetProductReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductReviewsQuery, GetProductReviewsQueryVariables>({ query: GetProductReviewsDocument, ...options });
};