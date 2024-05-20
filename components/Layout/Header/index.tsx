import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";
import { GetMainCategoriesQuery } from "@/graphql/generated";
import { FC } from "react";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <div className="md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse">
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default Header;
