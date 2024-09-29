import { query } from "@/graphql/lib/client";
import React from "react";
import CategorySwiper from ".";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/a11y";

const ServerCategorySwiper = async ({ category }) => {
  return <CategorySwiper categories={category} />;
};

export default ServerCategorySwiper;
