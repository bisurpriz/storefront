import { CookieTokens } from "@/app/@auth/contants";
import { cookies } from "next/headers";

type ExtractVariables<T> = T extends { variables: infer V } ? V : never;

type BonnmarseError = {
  extensions: {
    code: string;
  };
  cause?: string;
  status?: number;
  message: string;
};

export function isBonnmarseError(error: any): error is BonnmarseError {
  return error.extensions?.code === "INTERNAL_SERVER_ERROR";
}

async function customFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const cooks = await cookies();
    const token = cooks.get(CookieTokens.ACCESS_TOKEN).value;

    const result = await fetch(process.env.HASURA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isBonnmarseError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export { customFetch as fetch };
