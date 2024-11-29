import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { FC } from "react";
import HeaderTop from "./Top";
import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <div className="z-10 mx-auto flex max-w-screen-2xl flex-col items-center justify-start bg-white leading-none">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default Header;
