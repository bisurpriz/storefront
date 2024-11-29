import { CookieTokens } from "@/app/@auth/contants";
import { cookies } from "next/headers";
import BaseFetch from "./BaseFetch";

class ServerFetch extends BaseFetch {
  async request<T>({
    query,
    variables,
    tags,
  }: {
    query: string;
    variables?: any;
    tags?: string[];
  }): Promise<T> {
    const cooks = await cookies();
    const token = cooks.get(CookieTokens.ACCESS_TOKEN)?.value;
    const guestId = cooks.get(CookieTokens.GUEST_ID)?.value;

    try {
      const response = await fetch(
        this.hasuraUrl,
        this.buildFetchOptions({ token, query, variables, tags, guestId }),
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
