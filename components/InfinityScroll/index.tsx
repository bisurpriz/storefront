/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import EmptyPage from "./EmptyPage";
import dynamic from "next/dynamic";
import { PER_REQUEST } from "@/app/constants";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
  params?: any;
}

const DynamicProductItem = dynamic(
  () => import("../Product/Item/ProductItem5")
);

const InfinityScroll = <T,>({
  initialData,
  totalCount,
  query,
  dataKey,
  params,
}: InfinityScrollProps<T>) => {
  const [data, setData] = useState<T[]>(() => initialData);
  const [offset, setOffset] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const loadMoreData = async () => {
    const next = offset + PER_REQUEST;
    const response = await query(
      {
        offset: next,
        limit: PER_REQUEST,
      },
      params
    );
    setOffset(next);
    setData((prev) => [...prev, ...response[dataKey]]);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (inView && totalCount > data?.length) {
      console.log("load more data");
      loadMoreData();
    }
  }, [inView]);

  if (totalCount === 0) return <EmptyPage />;

  return (
    <div className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 max-sm:gap-2 pb-2">
      {data?.map((item: any) => (
        <DynamicProductItem key={item.id} {...item} />
      ))}
      {totalCount > data?.length && (
        <div
          ref={ref}
          className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 max-sm:gap-2 pb-2"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfinityScroll;
