import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { FC } from "react";
import HeaderTop from "./Top";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <div className="bg-white max-w-screen-xl mx-auto z-10 leading-none flex flex-col items-center justify-start">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default Header;
