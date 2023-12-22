"use server";

import { readIdFromCookies } from "@/app/actions";
import { OrderItemWithReview } from "@/common/types/Order/order";
import { ReviewWithProduct } from "@/common/types/Review/review";
import { mutate, query } from "@/graphql/lib/client";
import { CREATE_REVIEW } from "@/graphql/queries/review/mutation";
import { GET_ORDERS_WITH_REVIEW } from "@/graphql/queries/review/query";

export const getOrderWithReview = async () => {
  const userId = await readIdFromCookies();
  const { data, loading } = await query<{
    order_item: OrderItemWithReview[];
    review: ReviewWithProduct[];
  }>({
    query: GET_ORDERS_WITH_REVIEW,
    fetchPolicy: "no-cache",
    variables: { user_id: userId },
  });

  const { order_item, review } = data;

  return {
    order_item: order_item.map(
      (item) =>
        ({
          ...item,
          reviews_count: item.product.reviews_aggregate.aggregate.count,
        } as OrderItemWithReview)
    ),
    reviews: review.map((item) => ({
      ...item,
      product: {
        ...item.product,
        reviews_count: item.product.reviews_aggregate.aggregate.count,
      },
    })),
    loading,
  };
};

export const createReview = async ({
  comment,
  score,
  product_id,
  refetch,
}: {
  comment: string;
  score: number;
  product_id: number;
  refetch?: () => void;
}) => {
  const { data } = await mutate<{
    created_at: string;
  }>({
    mutation: CREATE_REVIEW,
    variables: {
      comment,
      score,
      product_id,
    },
  });

  if (refetch) {
    refetch();
  }

  const { created_at } = data;

  return {
    created_at,
  };
};
