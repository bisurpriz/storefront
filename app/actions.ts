"use server";

import { getClient } from "@/graphql/lib/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries/vendors/getVendorById";
import { cookies } from "next/headers";

// Bu fonksiyon async olduğu için await ile kullanılmalı veya .then ile kullanılmalı
export async function readIdFromCookies(string: string) {
  const auth = cookies();

  const id = auth.get(string);

  if (!id) null;

  return id?.value;
}

export const getVendorById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await getClient().query({
    query: GET_VENDOR_BY_ID,
    variables: {
      id,
    },
  });

  return {
    category: {
      name: data.product_by_pk.category.name,
    },
    product: {
      description: data.product_by_pk.description,
      id: data.product_by_pk.id,
      image_url: data.product_by_pk.image_url,
      name: data.product_by_pk.name,
      price: data.product_by_pk.price,
      quantity: data.product_by_pk.quantity,
    },
    questions: data.product_by_pk.questions,
    reviews: {
      data: data.product_by_pk.reviews,
      totalCount: data.product_by_pk.reviews_aggregate.aggregate.count,
    },
    loading,
  };
};
