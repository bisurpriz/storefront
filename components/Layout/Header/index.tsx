import React from "react";
import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { query } from "@/graphql/lib/client";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";
import Divider from "@/components/Divider";

const Header = async () => {
  const { data } = await query({
    query: GET_ALL_CATEGORIES,
  });

  return (
    <div className="text-xs leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse mx-12 max-md:mx-0">
      <HeaderTop />
      <HeaderMiddle />
      <Divider orientation="horizontal" />
      <HeaderBottom categories={data.category} />
      <Divider orientation="horizontal" />
    </div>
  );
};

export default Header;
