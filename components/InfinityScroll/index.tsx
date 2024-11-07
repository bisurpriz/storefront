"use client";

import { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import EmptyPage from "./EmptyPage";
import dynamic from "next/dynamic";
import { PER_REQUEST } from "@/app/constants";
import { useProgress } from "react-transition-progress";
import Spinner from "../Spinner";
import { cn } from "@/lib/utils";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
  params?: any;
}

const DynamicProductItem = dynamic(
  () => import("../Product/Item/ProductItem2"),
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
          "grid grid-cols-4",
          "gap-2 max-sm:grid-cols-1",
          "gap-2 max-md:grid-cols-2",
          "gap-4 max-lg:grid-cols-3",
          "gap-6 max-xl:grid-cols-3",
          "gap-8 max-2xl:grid-cols-4",
        )}
      >
        {data?.map((item: any) => {
          return <DynamicProductItem {...item} key={item.id} />;
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
