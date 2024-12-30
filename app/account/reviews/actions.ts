"use server";

import { readIdFromCookies } from "@/app/actions";
import { revalidateTag } from "next/cache";

import {
  CreateReviewMutation,
  GetOrdersWithReviewsQuery,
} from "@/graphql/queries/review/review.generated";
import { BonnmarseApi } from "@/service/fetch";
import { CreateReviewDocument } from "@/service/product/reviews";
import { GetOrdersWithReviewsDocument } from "@/service/user/order";

export const getOrderWithReview = async () => {
  const userId = await readIdFromCookies();
  const { order_item, review } =
    await BonnmarseApi.request<GetOrdersWithReviewsQuery>({
      query: GetOrdersWithReviewsDocument,
      variables: { user_id: userId },
      tags: ["getOrderWithReview"],
    });

  return {
    order_item,
    reviews: review,
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
  const data = await BonnmarseApi.request<CreateReviewMutation>({
    query: CreateReviewDocument,
    variables: {
      comment,
      score,
      product_id,
    },
  });

  const { insert_review_one } = data;

  revalidateTag("getOrderWithReview");
  return {
    created_at: insert_review_one?.created_at,
  };
};
