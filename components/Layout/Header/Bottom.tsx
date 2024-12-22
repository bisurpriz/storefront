import { Category } from "@/common/types/Category/category";
import Menu from "@/components/Menu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import { Search } from "@/components/Search";

interface Props {
  categories: Category[];
}

const HeaderBottom = ({ categories }: Props) => {
  const menuData: MenuItem[] | undefined = categories?.map((category) => ({
    link: `/${category.slug}`,
    text: category.name,
  }));

  return (
    <div className="mb-0 mt-2 flex w-full items-end justify-between gap-4 border-b border-gray-200 px-4 pb-2 lg:gap-8">
      <Menu items={menuData} className="max-sm:hidden" />
      <div className="w-full sm:hidden">
        <Search />
      </div>
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
