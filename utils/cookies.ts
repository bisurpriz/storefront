import { CookieTokens } from "@/app/@auth/contants";
import Cookies from "js-cookie";

export interface CookieOptions extends Cookies.CookieAttributes {
  domain: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  expires?: Date;
}

export const getDefaultCookieOptions = (): CookieOptions => ({
  domain:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_DOMAIN || ".bonnmarse.com"
      : "localhost",
  path: "/",
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
});

export const setCookie = (
  name: string,
  value: any,
  options?: Partial<CookieOptions>,
) => {
  const cookieOptions = {
    ...getDefaultCookieOptions(),
    ...options,
  };

  Cookies.set(
    name,
    typeof value === "string" ? value : JSON.stringify(value),
    cookieOptions,
  );
};

export const getCookie = <T = any>(name: string): T | null => {
  const value = Cookies.get(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
};

export const removeCookie = (
  name: string,
  options?: Partial<CookieOptions>,
) => {
  const cookieOptions = {
    ...getDefaultCookieOptions(),
    ...options,
  };

  Cookies.remove(name, cookieOptions);
};

// Location specific cookie utilities
export const setLocationCookie = (locationData: any) => {
  setCookie(CookieTokens.LOCATION_ID, locationData);

  // Dispatch location change event
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("locationChange", {
        detail: locationData,
      }),
    );
  }
};

export const getLocationCookie = () => {
  return getCookie(CookieTokens.LOCATION_ID);
};

export const removeLocationCookie = () => {
  removeCookie(CookieTokens.LOCATION_ID);
};
