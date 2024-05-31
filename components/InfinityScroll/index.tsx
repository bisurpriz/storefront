/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import ProductItem5 from "../Product/Item/ProductItem5";
import ProductItemSkeleton from "../Product/Item/ProductItemSkeleton";
import ProductItemHorizontal from "../Product/Item/ProductItemHorizontal";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
  useHorizontalCard?: boolean;
}

const PER_REQUEST = 15;

const InfinityScroll = <T,>({
  initialData,
  totalCount,
  query,
  dataKey,
  useHorizontalCard = false,
}: InfinityScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [offset, setOffset] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (inView && totalCount > data.length) {
      loadMoreData();
    }
  }, [inView]);

  const loadMoreData = async () => {
    const nextOffset = offset + PER_REQUEST;
    const response = await query({ offset: nextOffset });
    setOffset(nextOffset);
    setData((prevData) => [...prevData, ...response[dataKey]]);
  };

  const renderProductItem = (item: any) =>
    useHorizontalCard ? (
      <ProductItemHorizontal key={item.id} {...item} />
    ) : (
      <ProductItem5 key={item.id} {...item} />
    );

  const renderSkeletons = () =>
    Array.from({ length: PER_REQUEST }).map((_, i) => (
      <ProductItemSkeleton key={i} />
    ));

  const gridClassName = useHorizontalCard
    ? "grid max-xs:grid-cols-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-sm:gap-4"
    : "grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-sm:gap-2"; // Default card düzeni

  return (
    <div className={gridClassName}>
      <Suspense fallback={renderSkeletons()}>
        {data.map(renderProductItem)}
      </Suspense>
      {totalCount === 0 && <div className="text-center">Ürün bulunamadı</div>}
      <div ref={ref}>{totalCount > data?.length && <Loading />}</div>
    </div>
  );
};

export default InfinityScroll;
