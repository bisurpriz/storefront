import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import { FC } from "react";
import HeaderTop from "./Top";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </>
  );
};

export default Header;
