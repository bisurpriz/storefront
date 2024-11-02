import React from "react";
import CategorySwiper from ".";

const ServerCategorySwiper = async ({ category }) => {
  return <CategorySwiper categories={category} />;
};

export default ServerCategorySwiper;
