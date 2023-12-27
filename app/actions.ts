"use server";

import { query } from "@/graphql/lib/client";
import { GET_VENDOR_BY_ID } from "@/graphql/queries/vendors/getVendorById";
import { getSession } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";

// Bu fonksiyon async olduğu için await ile kullanılmalı veya .then ile kullanılmalı
export async function readIdFromCookies() {
  const auth = cookies();

  console.log(JSON.stringify(auth), "auth");

  const id = auth.get("user_id");

  if (!id) null;

  return id?.value;
}

export async function getIdToken() {
  const session = await getSession();
  return session.idToken;
}

export async function writeIdToCookies(value: string) {
  const auth = cookies();

  auth.set("user_id", value);

  return auth;
}

export async function readFingerPrintFromCookies() {
  const auth = cookies();

  const fingerprint = auth.get("fingerPrint");

  if (!fingerprint) null;

  return fingerprint?.value;
}

export const getVendorById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await query({
    query: GET_VENDOR_BY_ID,
    variables: {
      id,
    },
  });

  return {
    category: {
      name: data.product.category.name,
    },
    product: {
      description: data.product.description,
      id: data.product.id,
      image_url: data.product.image_url,
      name: data.product.name,
      price: data.product.price,
      quantity: data.product.quantity,
    },
    questions: data.product.questions,
    reviews: {
      data: data.product.reviews,
      totalCount: data.product.reviews_aggregate.aggregate.count,
    },
    loading,
  };
};
