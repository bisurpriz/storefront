class BaseFetch {
  protected hasuraUrl = process.env.HASURA_URL || "";

  protected getHeaders(
    token?: string,
    additionalHeaders?: HeadersInit,
    guestId?: string,
  ): HeadersInit {
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!token && guestId && { "x-hasura-guest-id": guestId }),
      ...additionalHeaders,
    };
  }

  protected buildFetchOptions({
    token,
    guestId,
    query,
    variables,
    tags,
    additionalHeaders,
  }: {
    token?: string;
    guestId?: string;
    query: string;
    variables?: any;
    tags?: string[];
    additionalHeaders?: HeadersInit;
  }): RequestInit {
    const options: RequestInit = {
      method: "POST",
      headers: this.getHeaders(token, additionalHeaders, guestId),
      body: JSON.stringify({ query, variables }),
    };

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
