"use client";

import { PER_REQUEST } from "@/app/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  hasFilter?: boolean;
}

const ProductCount = memo(
  ({ current, total }: { current: number; total: number }) => (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          <strong className="font-medium text-gray-900">{total}</strong> üründen{" "}
          <strong className="font-medium text-gray-900">{current}</strong>{" "}
          tanesi gösteriliyor
        </span>
      </div>
    </div>
  ),
);

ProductCount.displayName = "ProductCount";

const LoadingTrigger = memo(
  ({
    isLoading,
    loadingRef,
  }: {
    isLoading: boolean;
    loadingRef: RefObject<HTMLDivElement>;
  }) => (
    <div
      ref={loadingRef}
      className="h-32 w-full bg-gray-50/10"
      style={{
        minHeight: "150px",
        marginTop: "2rem",
        position: "relative",
      }}
      data-testid="scroll-trigger"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-500">Yükleniyor...</span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">
            Daha fazla ürün yüklemek için kaydırın
          </span>
        </div>
      )}
    </div>
  ),
);

LoadingTrigger.displayName = "LoadingTrigger";

const DynamicProductItem = dynamic(
  () => import("../Product/Item/ProductItemv2"),
  {
    loading: () => <ProductItemSkeleton />,
  },
);

const useInfiniteScroll = <T,>({
  initialData,
  totalCount,
  query,
  params,
  hasFilter = false,
}: InfinityScrollProps<T>) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>(initialData);
  const [currentOffset, setCurrentOffset] = useState(initialData?.length || 0);
  const [hasMore, setHasMore] = useState(
    totalCount > (initialData?.length || 0),
  );

  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const response = await query(
        {
          offset: currentOffset,
          limit: PER_REQUEST,
        },
        params,
      );

      const newItems = response?.hits?.map((hit) => hit.document) || [];

      if (newItems.length > 0) {
        setData((prevData) => [...prevData, ...newItems]);
        setCurrentOffset((prev) => prev + newItems.length);
        setHasMore(totalCount > currentOffset + newItems.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more data:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentOffset, hasMore, query, params, totalCount, isLoading]);

  useEffect(() => {
    if (!loadingRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading) {
          loadMoreData();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(loadingRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMoreData]);

  useEffect(() => {
    setData(initialData);
    setCurrentOffset(initialData.length);
    setHasMore(totalCount > initialData.length);
    setIsLoading(false);
  }, [initialData, totalCount, params]);

  return {
    data,
    isLoading,
    hasMore,
    loadingRef,
  };
};

const InfinityScroll = <T,>(props: InfinityScrollProps<T>) => {
  const { data, isLoading, hasMore, loadingRef } = useInfiniteScroll(props);
  const { hasFilter } = props;
  if (props.totalCount === 0) return <EmptyPage />;

  return (
    <>
      <ProductCount current={data.length} total={props.totalCount} />
      <div
        className={cn(
          "grid grid-cols-2 gap-2",
          "sm:grid-cols-2 sm:gap-2",
          "md:grid-cols-3 md:gap-2",
          "lg:grid-cols-3 lg:gap-4",
          "xl:grid-cols-5 xl:gap-6",
          hasFilter && "xl:grid-cols-4 xl:gap-6",
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
        <LoadingTrigger isLoading={isLoading} loadingRef={loadingRef} />
      )}
    </>
  );
};

export default memo(InfinityScroll);
