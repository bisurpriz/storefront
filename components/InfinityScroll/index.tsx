/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import EmptyPage from "./EmptyPage";
import dynamic from "next/dynamic";
import { PER_REQUEST } from "@/app/constants";
import { useProgress } from "react-transition-progress";
import Spinner from "../Spinner";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
  params?: any;
}

const DynamicProductItem = dynamic(
  () => import("../Product/Item/ProductItem5"),
  {
    loading: () => <ProductItemSkeleton />,
  }
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
        params
      );
      setOffset(next);
      setData((prev) => [
        ...prev,
        ...response?.hits.map((hit) => hit.document),
      ]);
    });
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (isPending) return;

    if (inView && totalCount >= data?.length) {
      loadMoreData();
    }
  }, [inView, isPending]);

  if (totalCount === 0) return <EmptyPage />;

  return (
    <>
      <div className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 max-sm:gap-2 pb-2">
        {data?.map((item: any) => (
          <DynamicProductItem key={item.id} {...item} />
        ))}
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
          className="flex justify-center items-center w-full h-20 bg-transparent"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default InfinityScroll;
