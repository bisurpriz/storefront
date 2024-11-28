class BaseFetch {
  protected hasuraUrl = process.env.HASURA_URL || "";

  protected getHeaders(
    token?: string,
    additionalHeaders?: HeadersInit,
  ): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...additionalHeaders,
    };
  }

  protected buildFetchOptions({
    token,
    query,
    variables,
    tags,
    additionalHeaders,
  }: {
    token?: string;
    query: string;
    variables?: any;
    tags?: string[];
    additionalHeaders?: HeadersInit;
  }): RequestInit {
    const options: RequestInit = {
      method: "POST",
      headers: this.getHeaders(token, additionalHeaders),
      body: JSON.stringify({ query, variables }),
    };

    // Server-side özel tag desteği
    if (tags && typeof window === "undefined") {
      (options as any).next = { tags };
    }

    return options;
  }

  protected handleError(error: any): never {
    if (error?.extensions?.code === "INTERNAL_SERVER_ERROR") {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message,
      };
    }
    throw error;
  }
}

export default BaseFetch;
