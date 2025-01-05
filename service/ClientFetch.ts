import { CookieTokens } from "@/app/@auth/contants";
import Cookies from "js-cookie";
import BaseFetch from "./BaseFetch";

class ClientFetch extends BaseFetch {
  async request<T>({
    query,
    variables,
    additionalHeaders,
    withAuth = true,
  }: {
    query: string;
    variables?: any;
    additionalHeaders?: HeadersInit;
    withAuth?: boolean;
  }): Promise<T> {
    let token;
    let guestId;
    if (withAuth) {
      token = Cookies.get(CookieTokens.ACCESS_TOKEN);
      guestId = Cookies.get(CookieTokens.GUEST_ID);
    }

    try {
      const response = await fetch(
        this.hasuraUrl,
        this.buildFetchOptions({
          token,
          query,
          variables,
          guestId,
          additionalHeaders,
        }),
      );

      const body = await response.json();
      if (body.errors) {
        throw body.errors[0];
      }

      return body.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default ClientFetch;
