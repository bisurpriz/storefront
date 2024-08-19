import Cookies from "js-cookie";

export function getClientCookie(cookieName: string) {
  return Cookies.get(cookieName);
}

export function setClientCookie(cookieName: string, value: string) {
  return Cookies.set(cookieName, value);
}

export function removeClientCookie(cookieName: string) {
  return Cookies.remove(cookieName);
}
