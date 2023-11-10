/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import ProductItem from "../Product/Item";
import Loading from "./Loading";
import { IMAGE_URL } from "@/contants/urls";

interface InfinityScrollProps<T> {
  initialData: T[];
  query: any;
  dataKey: string;
  totalCount: number;
}

const PER_REQUEST = 10;

const InfinityScroll = <T,>({
  initialData,
  totalCount,
  query,
  dataKey,
}: InfinityScrollProps<T>) => {
  const [data, setData] = React.useState<T[]>(initialData);
  const [offset, setOffset] = React.useState(0);
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

  React.useEffect(() => {
    if (inView && totalCount > data?.length) {
      loadMoreData();
    }
  }, [inView]);

  return (
    <div className="grid max-xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data?.map((item: any) => (
        <ProductItem
          key={item.id}
          name={item.name}
          description={item.description}
          image={IMAGE_URL + "/" + item.image_url?.[0]}
          price={item.price}
          id={item.id}
        />
      ))}
      <div ref={ref}>{totalCount > data?.length && <Loading />}</div>
    </div>
  );
};

export default InfinityScroll;
