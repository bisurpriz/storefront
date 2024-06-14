/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import ProductItem5 from "../Product/Item/ProductItem5";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
  params?: any;
}

const PER_REQUEST = 15;

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
    console.log("response", response);
    setData((prev) => [...prev, ...response[dataKey]]);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (inView && totalCount > data?.length) {
      console.log("loading more data");
      loadMoreData();
    }
  }, [inView]);

  return (
    <div className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-sm:gap-2">
      <Suspense
        fallback={Array.from({
          length: PER_REQUEST,
        }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      >
        {data?.map((item: any) => (
          <ProductItem5 key={item.id} {...item} />
        ))}
      </Suspense>
      {totalCount === 0 && <div className="text-center">Ürün bulunamadı</div>}
      <div ref={ref}>{totalCount > data?.length && <Loading />}</div>
    </div>
  );
};

export default InfinityScroll;
