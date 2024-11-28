import ClientFetch from "./ClientFetch";
import ServerFetch from "./ServerFetch";

class Fetch {
  private fetch: ClientFetch | ServerFetch;

  constructor() {
    this.fetch =
      typeof window === "undefined" ? new ServerFetch() : new ClientFetch();
  }

  async request<T>({
    query,
    variables,
    tags,
  }: {
    query: string;
    variables?: any;
    tags?: string[];
  }): Promise<T> {
    try {
      console.log("Requesting:", tags.join(", "));
      return await this.fetch.request({ query, variables, tags });
    } catch (error) {
      this.handleError(error, query);
      throw error;
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
