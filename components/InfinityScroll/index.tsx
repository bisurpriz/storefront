"use client";

import { PER_REQUEST } from "@/app/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import EmptyPage from "./EmptyPage";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: (
    params: { offset: number; limit: number },
    extraParams?: any,
  ) => Promise<any>;
  totalCount: number;
  params?: any;
}

const DynamicProductItem = dynamic(
  () => import("../Product/Item/ProductItemv2"),
  {
    loading: () => <ProductItemSkeleton />,
  },
);

const InfinityScroll = <T,>({
  initialData,
  totalCount,
  query,
  params,
}: InfinityScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [offset, setOffset] = useState(initialData.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalCount > initialData.length);

  const loadingRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(loadingRef, {});
  const isVisible = !!entry?.isIntersecting;

  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const next = offset + PER_REQUEST;

      const response = await query(
        {
          offset,
          limit: PER_REQUEST,
        },
        params,
      );

      const newItems = response?.hits?.map((hit) => hit.document) || [];

      setData((prev) => [...prev, ...newItems]);
      setOffset(next);
      setHasMore(totalCount > next);
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore, query, params, totalCount]);

  useEffect(() => {
    if (isVisible && hasMore) {
      loadMoreData();
    }
  }, [isVisible, loadMoreData, hasMore]);

  useEffect(() => {
    setData(initialData);
    setOffset(initialData.length);
    setHasMore(totalCount > initialData.length);
  }, [initialData, totalCount]);

  if (totalCount === 0) return <EmptyPage />;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-2",
          "sm:grid-cols-2 sm:gap-2",
          "md:grid-cols-3 md:gap-2",
          "lg:grid-cols-4 lg:gap-4",
          "xl:grid-cols-5 xl:gap-6",
        )}
      >
        {data?.map((item: any) => (
          <DynamicProductItem key={item.id} {...item} />
        ))}
        {isLoading && (
          <>
            {[...Array(4)].map((_, index) => (
              <ProductItemSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>
      {hasMore && (
        <div ref={loadingRef} className="h-20 w-full" aria-hidden="true" />
      )}
    </>
  );
};

export default InfinityScroll;
