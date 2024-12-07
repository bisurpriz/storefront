import ClientFetch from "./ClientFetch";
import ServerFetch from "./ServerFetch";

class Fetch {
  private fetch: ClientFetch | ServerFetch;

  constructor() {
    console.log("Fetch Service is created.");
    this.fetch =
      typeof window === "undefined" ? new ServerFetch() : new ClientFetch();
  }

  async request<T>({
    query,
    variables,
    tags,
    withAuth = true,
    additionalHeaders,
  }: {
    query: string;
    variables?: any;
    tags?: string[];
    withAuth?: boolean;
    additionalHeaders?: HeadersInit
  }): Promise<T> {
    try {
      console.log("Requesting:", tags?.join(", "));
      return await this.fetch.request({ query, variables, tags, withAuth, additionalHeaders });
    } catch (error) {
      this.handleError(error, query);
    }
  }

  private handleError(error: any, query: string): void {
    if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
      console.error("Sunucu Hatası:", {
        message: error.message,
        cause: error.cause,
        status: error.status,
        query,
      });
    } else {
      console.error("Genel Hata:", {
        message: error.message || error,
        query,
      });
    }
  }
}

export const BonnmarseApi = new Fetch();
