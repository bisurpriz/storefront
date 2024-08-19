"use server";

import { readIdFromCookies } from "@/app/actions";

import { mutate, query } from "@/graphql/lib/client";
import {
  CreateReviewDocument,
  CreateReviewMutation,
  CreateReviewMutationVariables,
  GetOrdersWithReviewsDocument,
  GetOrdersWithReviewsQuery,
  GetOrdersWithReviewsQueryVariables,
} from "@/graphql/queries/review/review.generated";
import { revalidatePath } from "next/cache";

export const getOrderWithReview = async () => {
  const userId = await readIdFromCookies();
  const { data, loading } = await query<
    GetOrdersWithReviewsQuery,
    GetOrdersWithReviewsQueryVariables
  >({
    query: GetOrdersWithReviewsDocument,
    variables: { user_id: userId },
  });

  const { order_item, review } = data;

  return {
    order_item: order_item,
    reviews: review,
    loading,
  };
};

export const createReview = async ({
  comment,
  score,
  product_id,
}: {
  comment: string;
  score: number;
  product_id: number;
}) => {
  const { data } = await mutate<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >({
    mutation: CreateReviewDocument,
    variables: {
      comment,
      score,
      product_id,
    },
  });

  revalidatePath("/account/reviews");

  const {
    insert_review_one: { created_at },
  } = data;

  return {
    created_at,
  };
};
