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
import axios from "axios";

// Bu fonksiyon async olduğu için await ile kullanılmalı veya .then ile kullanılmalı
export async function readIdFromCookies() {
  const auth = cookies();

  const id = auth.get("user_id");

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

export async function readFingerPrintFromCookies() {
  const auth = cookies();

  const fingerprint = auth.get("fingerPrint");

  if (!fingerprint) null;

  return fingerprint?.value;
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
  const ipv6 = headers().get("X-Forwarded-For").split(":");
  const ipv4 = ipv6[ipv6.length - 1];

  if (ipv4) return ipv4;

  const res = await axios.get("https://api.ipify.org/?format=json");

  return res.data.ip;
};

export const getGeoLocation = async (ip: string) => {
  const res = await axios.get(`https://ipapi.co/${ip}/json/`);

  return res.data;
};
