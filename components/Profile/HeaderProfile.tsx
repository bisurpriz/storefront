import Button from "../Button";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { profileItems } from "./contants";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

const HeaderProfile = async () => {
  const session = await getSession();

  const user = session?.user;

  return !user ? (
    <div className="flex items-center justify-end ml-2">
      <Link href="/api/auth/login">
        <Button type="button" size="small" label="Giriş Yap" />
      </Link>
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse ml-2">
      <Dropdown
        dropdownPlacement="bottomRight"
        options={profileItems}
        className="cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Image
            src={user?.picture || ""}
            width={30}
            height={30}
            alt="User Picture"
            className="rounded-full min-h-[30px] min-w-[30px]"
            loading="lazy"
          />
          <span className="text-sm font-normal text-slate-500 max-lg:hidden">
            {user?.name}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderProfile;
