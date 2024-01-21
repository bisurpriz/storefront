import Menu from "@/components/Menu";
import OfflineStatus from "@/components/OfflineStatus/OfflineStatus";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./components/CartButton";
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
    <div className="w-full max-md:px-4 pb-2 pt-2 flex items-center sm:gap-8 max-md:justify-between overflow-hidden border-y">
      <Menu items={menuData} className="max-sm:hidden" />
      <Link href="/" className="sm:hidden max-sm:mr-auto">
        <Image
          src={"/logo.svg"}
          width={180}
          height={55}
          alt="Bonnmarşe Logo"
          priority
        />
      </Link>
      <div className="sm:hidden flex">
        <CartButton />
        <MobileDrawer categories={categories} menuData={menuData} />
      </div>
      <OfflineStatus />
    </div>
  );
};

export default HeaderBottom;
