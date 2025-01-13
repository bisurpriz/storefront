import ClientFetch from "./ClientFetch";
import ServerFetch from "./ServerFetch";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  tags?: string[];
}

interface RequestOptions {
  query: string;
  variables?: any;
  tags?: string[];
  withAuth?: boolean;
  additionalHeaders?: HeadersInit;
  cache?: {
    enable: boolean;
    duration?: number; // in milliseconds
  };
}

class Fetch {
  private fetch: ClientFetch | ServerFetch;
  private cache: Map<string, CacheItem<any>>;
  private readonly defaultCacheDuration: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor() {
    // console.table("Fetch Service is created.");
    this.fetch =
      typeof window === "undefined" ? new ServerFetch() : new ClientFetch();
    this.cache = new Map();
  }

  private generateCacheKey(query: string, variables?: any): string {
    return JSON.stringify({ query, variables });
  }

  private isCacheValid<T>(cacheItem: CacheItem<T>, duration: number): boolean {
    return Date.now() - cacheItem.timestamp < duration;
  }

  private getCachedData<T>(
    cacheKey: string,
    duration: number,
    tags?: string[],
  ): T | null {
    const cachedItem = this.cache.get(cacheKey) as CacheItem<T>;

    if (!cachedItem) return null;
    if (!this.isCacheValid(cachedItem, duration)) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cachedItem.data;
  }

  invalidateCache(tags?: string[]): void {
    if (!tags || tags.length === 0) {
      this.cache.clear();
      return;
    }

    this.cache.forEach((value, key) => {
      if (value.tags?.some((tag) => tags.includes(tag))) {
        this.cache.delete(key);
      }
    });
  }

  async request<T>({
    query,
    variables,
    tags,
    withAuth = true,
    additionalHeaders,
    cache,
  }: RequestOptions): Promise<T> {
    try {
      const cacheKey = this.generateCacheKey(query, variables);
      const cacheDuration = cache?.duration || this.defaultCacheDuration;

      if (cache?.enable) {
        const cachedData = this.getCachedData<T>(cacheKey, cacheDuration, tags);
        if (cachedData) return cachedData;
      }

      // console.table({
      //   tags: tags?.join(", "),
      //   withAuth,
      //   ...(additionalHeaders && { additionalHeaders }),
      // });

      const response = (await this.fetch.request({
        query,
        variables,
        tags,
        withAuth,
        additionalHeaders,
      })) as T;

      // Cache the response only if caching is enabled for this request
      if (cache?.enable) {
        this.cache.set(cacheKey, {
          data: response,
          timestamp: Date.now(),
          tags,
        });
      }

      return response;
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
