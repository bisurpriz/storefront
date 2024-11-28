import { CookieTokens } from "@/app/@auth/contants";
import Cookies from "js-cookie";
import BaseFetch from "./BaseFetch";

class ClientFetch extends BaseFetch {
  async request<T>({
    query,
    variables,
  }: {
    query: string;
    variables?: any;
  }): Promise<T> {
    const token = Cookies.get(CookieTokens.ACCESS_TOKEN);

    try {
      const response = await fetch(
        this.hasuraUrl,
        this.buildFetchOptions({ token, query, variables }),
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
