import { GetMainCategoriesQuery } from "@/graphql/queries/categories/getCategories.generated";
import { cn } from "@/lib/utils";
import { FC } from "react";
import HeaderBottom from "./Bottom";
import HeaderMiddle from "./Middle";
import HeaderTop from "./Top";

const Header: FC<{
  category: GetMainCategoriesQuery["category"];
}> = async ({ category }) => {
  return (
    <div
      className={cn(
        `sticky top-0 z-50 mx-auto w-full max-w-7xl border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/90`,
      )}
    >
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default Header;
