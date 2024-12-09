"use client";

import { PER_REQUEST } from "@/app/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { useProgress } from "react-transition-progress";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import Spinner from "../Spinner";
import EmptyPage from "./EmptyPage";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
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
  const [data, setData] = useState<T[]>(() => initialData);
  const [offset, setOffset] = useState(0);
  const [isPending, startTransition] = useTransition();
  const startProgress = useProgress();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMoreData = async () => {
    startTransition(async () => {
      startProgress();
      const next = offset + PER_REQUEST;

      const response = await query(
        {
          offset: next,
          limit: PER_REQUEST,
        },
        params,
      );
      setOffset(next);
      setData((prev) => [
        ...prev,
        ...response?.hits.map((hit) => hit.document),
      ]);
    });
  };

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (isPending) return;

    if (inView && totalCount >= data?.length) {
      loadMoreData();
    }
  }, [inView, isPending, totalCount, data]);

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
        {data?.map((item: any) => {
          return <DynamicProductItem key={item.id} {...item} />;
        })}
        {isPending && (
          <>
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
            <ProductItemSkeleton />
          </>
        )}
      </div>
      {totalCount > data?.length && (
        <div
          ref={ref}
          className="flex h-20 w-full items-center justify-center bg-transparent"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default InfinityScroll;
