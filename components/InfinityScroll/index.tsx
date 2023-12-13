/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import { IMAGE_URL } from "@/contants/urls";
import ProductItem from "../Product/Item";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
}

const PER_REQUEST = 15;

const InfinityScroll = <T,>({
  initialData,
  totalCount,
  query,
  dataKey,
}: InfinityScrollProps<T>) => {
  const [data, setData] = useState<T[]>(initialData);
  const [offset, setOffset] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  const loadMoreData = async () => {
    const next = offset + PER_REQUEST;
    const response = await query({
      offset: next,
    });

    setOffset(next);
    setData((prev) => [...prev, ...response[dataKey]]);
  };

  useEffect(() => {
    if (inView && totalCount > data?.length) {
      loadMoreData();
    }
  }, [inView]);

  return (
    <div className="grid max-xs:grid-cols-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-sm:gap-2">
      {data?.map((item: any) => (
        <ProductItem
          key={item.id}
          name={item.name}
          description={item.description}
          image_url={IMAGE_URL + "/" + item.image_url?.[0]}
          price={item.price}
          id={item.id}
          discount_price={item.discount_price}
          product_customizable_areas={item.product_customizable_areas}
        />
      ))}
      <div ref={ref}>{totalCount > data?.length && <Loading />}</div>
    </div>
  );
};

export default InfinityScroll;
