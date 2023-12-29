import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { query } from "@/graphql/lib/client";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";
import Divider from "@/components/Divider";
import { memo } from "react";

const Header = async () => {
  const { data } = await query({
    query: GET_ALL_CATEGORIES,
  });

  return (
    <div className="text-xs z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse px-12 max-sm:p-0 max-md:mx-0 sticky top-0 w-full left-0 bg-white">
      <HeaderTop />
      <HeaderMiddle />
      <Divider orientation="horizontal" />
      <HeaderBottom categories={data.category} />
      <Divider orientation="horizontal" />
    </div>
  );
};

export default memo(Header);
