import React from "react";
import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { getClient } from "@/graphql/lib/client";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";

const Header = async () => {
  const { data } = await getClient().query({
    query: GET_ALL_CATEGORIES,
  });

  return (
    <div className="text-xs leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse mx-12 max-md:mx-0">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={data.category} />
    </div>
  );
};

export default Header;
