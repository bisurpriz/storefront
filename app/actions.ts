"use server";

import {
  GetBannersDocument,
  GetBannersQuery,
  GetVendorByIdDocument,
  GetVendorByIdQuery,
} from "@/graphql/generated";
import { query } from "@/graphql/lib/client";
import { cookies, headers } from "next/headers";
import { CookieTokens } from "./@auth/contants";

export async function readIdFromCookies() {
  const auth = cookies();

  const id = auth.get(CookieTokens.USER_ID);

  if (!id) null;

  return id?.value;
}

export async function getIdToken() {
  const token = await cookies().get(CookieTokens.ACCESS_TOKEN).value;

  if (!token)
    return new Promise((resolve, reject) => reject("Session is null"));

  return token;
}

export async function writeIdToCookies(value: string) {
  const auth = cookies();

  auth.set("user_id", value, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return auth;
}

export const getVendorById = async ({ id }: { id: number }) => {
  const { data, loading } = await query<GetVendorByIdQuery>({
    query: GetVendorByIdDocument,
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

export async function getBanners() {
  const { data, loading } = await query<GetBannersQuery>({
    query: GetBannersDocument,
  });

  return {
    banners: data.system_banner,
    loading,
  };
}

export async function getQuarterCodeFromCookies(): Promise<string | null> {
  const quarterCode = await cookies().get(CookieTokens.QUARTER_CODE).value;

  if (!quarterCode) null;

  return quarterCode;
}

export const getIpAddress = async () => {
  const checkValidIp = (ip: string) => {
    if (!ip) return false;

    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => parseInt(part) >= 0 && parseInt(part) <= 255);
  };

  const ipv6 = headers().get("X-Forwarded-For")?.split(":");
  const ipv4 = ipv6[ipv6.length - 1];

  const ip = ipv4?.split(",")[0];

  const isValidIp = checkValidIp(ip);

  if (isValidIp) {
    return ip;
  } else {
    throw new Error("Invalid IP");
  }
};

export const getGeoLocation = async () => {
  const geo = headers().get("X-Forwarded-For");

  console.log(geo);

  return geo;
};
