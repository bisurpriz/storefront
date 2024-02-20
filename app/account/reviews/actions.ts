'use server';

import { readIdFromCookies } from '@/app/actions';
import { CreateReviewDocument, CreateReviewMutation, GetOrdersWithReviewsDocument, GetOrdersWithReviewsQuery } from '@/graphql/generated';
import { mutate, query } from '@/graphql/lib/client';
import { revalidatePath } from 'next/cache';

export const getOrderWithReview = async () => {
  const userId = await readIdFromCookies();
  const { data, loading } = await query<GetOrdersWithReviewsQuery>({
    query: GetOrdersWithReviewsDocument,
    fetchPolicy: 'no-cache',
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
  const { data } = await mutate<CreateReviewMutation>({
    mutation: CreateReviewDocument,
    variables: {
      comment,
      score,
      product_id,
    },
  });

  revalidatePath('/account/reviews');

  const { insert_review_one: { created_at } } = data;

  return {
    created_at,
  };
};
