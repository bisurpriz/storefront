"use server";

import { Location } from "@/common/types/Addresses/addresses";
import { GetBannersQuery } from "@/graphql/queries/banners/banners.generated";
import { parseJson } from "@/utils/format";
import { cookies, headers } from "next/headers";
import { CookieTokens } from "./@auth/contants";

import { CreateOrUpdateFcmTokenMutation } from "@/graphql/queries/notification/mutation.generated";
import { GetBannersDocument } from "@/service/banner";
import { BonnmarseApi } from "@/service/fetch";
import { FireBaseCloudMessagingDocument } from "@/service/firebase/cloudMessaging";
import jwt from "jsonwebtoken";

export async function readIdFromCookies() {
  const { get } = await cookies();

  const id = get(CookieTokens.USER_ID);
  if (!id) null;

  return id?.value;
}

export async function getAccessToken() {
  const { get } = await cookies();
  const token = get(CookieTokens.ACCESS_TOKEN)?.value;
  if (!token) return null;

  return token;
}

export async function readGuestIdFromCookies() {
  const { get } = await cookies();
  const guestId = get(CookieTokens.GUEST_ID)?.value;
  if (!guestId) return null;

  return guestId;
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
  const { system_banner } = await BonnmarseApi.request<GetBannersQuery>({
    query: GetBannersDocument,
    tags: ["getBanners"],
  });

  return {
    banners: system_banner,
  };
}

export async function getLocationFromCookie(): Promise<Location | null> {
  const { get } = await cookies();
  const value = get(CookieTokens.LOCATION_ID)?.value;

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

  const ipv6 = (await headers()).get("X-Forwarded-For")?.split(":");
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
  const geo = (await headers()).get("X-Forwarded-For");

  return geo;
};

export const createFCMToken = async (token: string) => {
  const { get } = await cookies();
  const userId = get(CookieTokens.USER_ID)?.value;
  if (!userId) return;

  await BonnmarseApi.request<CreateOrUpdateFcmTokenMutation>({
    query: FireBaseCloudMessagingDocument,
    variables: {
      token,
    },
  });
};
