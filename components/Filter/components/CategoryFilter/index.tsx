"use client";

import React from "react";
import FilterInput from "../FilterInput";

const CategoryFilterInput = () => {
  const data = Array.from({ length: 15 }).map((_, i) => ({
    key: `Category ${i}`,
    value: `category-${i}`,
  }));

  return <FilterInput title="Kategori" options={data} />;
};

export default CategoryFilterInput;
