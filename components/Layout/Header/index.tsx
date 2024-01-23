import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { query } from "@/graphql/lib/client";
import { GET_ALL_CATEGORIES } from "@/graphql/queries/categories/getCategories";
import { memo } from "react";

const Header = async () => {
  const { data } = await query({
    query: GET_ALL_CATEGORIES,
  });

  return (
    <div className='md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse'>
      <HeaderMiddle />
      <HeaderBottom categories={data.category} />
    </div>
  );
};

export default memo(Header);
