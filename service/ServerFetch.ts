import { CookieTokens } from "@/app/@auth/contants";
import BaseFetch from "./BaseFetch";

class ServerFetch extends BaseFetch {
  async request<T>({
    query,
    variables,
    tags,
    withAuth = true,
  }: {
    query: string;
    variables?: any;
    tags?: string[];
    withAuth?: boolean;
  }): Promise<T> {
    let token;
    let guestId;
    if (withAuth) {
      const { cookies } = await import("next/headers");

      token = (await cookies()).get(CookieTokens.ACCESS_TOKEN)?.value;
      guestId = (await cookies()).get(CookieTokens.GUEST_ID)?.value;
    }

    try {
      const response = await fetch(
        this.hasuraUrl,
        this.buildFetchOptions({ query, variables, tags, token, guestId }),
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

export default ServerFetch;
