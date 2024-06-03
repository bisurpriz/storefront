import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import { FC } from "react";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <>
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </>
  );
};

export default Header;
