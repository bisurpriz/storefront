import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import { FC } from "react";
import HeaderTop from "./Top";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <div className="sticky left-0 top-0 bg-white md:container mx-auto z-10 leading-none flex flex-col items-center justify-start">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default Header;
