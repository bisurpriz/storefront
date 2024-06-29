import Menu from "@/components/Menu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import { Category } from "@/common/types/Category/category";
import Search from "@/components/Search";

interface Props {
  categories: Category[];
}

const HeaderBottom = ({ categories }: Props) => {
  const menuData: MenuItem[] | undefined = categories?.map((category) => ({
    link: `/${category.slug}`,
    text: category.name,
  }));

  return (
    <div className="w-full mt-2 px-4 border-b border-gray-200 pb-2 mb-0 flex items-end justify-between gap-4 lg:gap-8">
      <Menu items={menuData} className="max-sm:hidden" />
      <div className="sm:hidden w-full">
        <Search />
      </div>
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
