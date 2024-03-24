import Menu from "@/components/Menu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import Image from "next/image";
import Link from "next/link";
import MobileDrawer from "./components/MobileDrawer";
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
    <div className="w-full max-md:px-4 flex items-center sm:gap-8 max-md:justify-between overflow-hidden max-md:mt-4">
      <Menu items={menuData} className="max-sm:hidden" />
      <Link href="/" className="sm:hidden max-sm:mr-auto">
        <Image
          src={"/logo.svg"}
          width={180}
          height={55}
          alt="Bonnmarşe Logo"
          priority
          className="max-sm:w-40 min-w-[180px]"
        />
      </Link>
      <div className="sm:hidden flex items-end">
        <MobileDrawer categories={categories} menuData={menuData} />
      </div>
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
