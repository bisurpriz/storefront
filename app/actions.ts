"use server";

import { query } from "@/graphql/lib/client";
import { cookies, headers } from "next/headers";
import { CookieTokens } from "./@auth/contants";
import { parseJson } from "@/utils/format";
import { Location } from "@/common/types/Addresses/addresses";
import {
  GetBannersDocument,
  GetBannersQuery,
  GetBannersQueryVariables,
} from "@/graphql/queries/banners/banners.generated";
import {
  GetCityByIdDocument,
  GetCityByIdQuery,
  GetCityByIdQueryVariables,
  GetDistrictByIdDocument,
  GetDistrictByIdQuery,
  GetDistrictByIdQueryVariables,
  GetQuarterByIdDocument,
  GetQuarterByIdQuery,
  GetQuarterByIdQueryVariables,
} from "@/graphql/queries/account/account.generated";
import jwt from "jsonwebtoken";

export async function readIdFromCookies() {
  const auth = cookies();

  const id = auth.get(CookieTokens.USER_ID);
  if (!id) null;

  return id?.value;
}

export async function getAccessToken() {
  const token = await cookies().get(CookieTokens.ACCESS_TOKEN)?.value;
  if (!token) return new Promise((resolve, reject) => resolve(null));

  return token;
}

export async function createJwt() {
  try {
    const JWT_CONFIG =
      typeof process.env.JWT_CONFIG === "object"
        ? process.env.JWT_CONFIG
        : JSON.parse(process.env.JWT_CONFIG || "");
    return await jwt.sign({}, JWT_CONFIG.secret, {
      expiresIn: "15m",
      notBefore: "0",
      algorithm: "HS256",
      audience: JWT_CONFIG.audience,
      issuer: JWT_CONFIG.issuer,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getBanners() {
  const { data, loading } = await query<
    GetBannersQuery,
    GetBannersQueryVariables
  >({
    query: GetBannersDocument,
  });

  return {
    banners: data.system_banner,
    loading,
  };
}

export async function getLocationFromCookie(): Promise<Location | null> {
  const value = await cookies().get(CookieTokens.LOCATION_ID)?.value;

  if (!value) return null;

  return parseJson(value);
}

export const getIpAddress = async () => {
  if (process.env.NODE_ENV === "development") return "127.0.0.1";

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
    return null;
  }
};

export const getGeoLocation = async () => {
  const geo = headers().get("X-Forwarded-For");

  return geo;
};

export const getQuarterById = async ({ id }) => {
  if (!id) return;

  const { data } = await query<
    GetQuarterByIdQuery,
    GetQuarterByIdQueryVariables
  >({
    query: GetQuarterByIdDocument,
    variables: {
      id: id && Number(id),
    },
  });
  return data;
};

export const getDistrictById = async ({ id }) => {
  if (!id) return;

  const { data } = await query<
    GetDistrictByIdQuery,
    GetDistrictByIdQueryVariables
  >({
    query: GetDistrictByIdDocument,
    variables: {
      id: id && Number(id),
    },
  });
  return data;
};

export const getCityById = async ({ id }) => {
  if (!id) return;

  const { data } = await query<GetCityByIdQuery, GetCityByIdQueryVariables>({
    query: GetCityByIdDocument,
    variables: {
      id: id && Number(id),
    },
  });
  return data;
};
