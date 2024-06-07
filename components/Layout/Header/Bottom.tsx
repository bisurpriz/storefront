import Menu from "@/components/Menu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import { Category } from "@/common/types/Category/category";

interface Props {
  categories: Category[];
}

const HeaderBottom = ({ categories }: Props) => {
  const menuData: MenuItem[] | undefined = categories?.map((category) => ({
    link: `/${category.slug}`,
    text: category.name,
  }));

  return (
    <div className="w-full mt-2 px-4">
      <Menu items={menuData} className="max-sm:hidden" />
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
