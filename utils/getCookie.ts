"client only";

import Cookies from "js-cookie";

export function getClientCookie(cookieName: string) {
  return Cookies.get(cookieName);
}

export function setClientCookie(
  cookieName: string,
  value: string,
  opt?: Cookies.CookieAttributes
) {
  return Cookies.set(cookieName, value, opt);
}

export function removeClientCookie(cookieName: string) {
  return Cookies.remove(cookieName);
}
