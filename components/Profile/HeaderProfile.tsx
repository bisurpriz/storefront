import React from "react";
import Button from "../Button";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Tooltip from "../Tooltip";
import Dropdown from "../Dropdown";
import Link from "next/link";
import { profileItems } from "./contants";

const HeaderProfile = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleLogin = () => {
    router.push(`/api/auth/login`);
  };

  return !user ? (
    <div className="flex items-center justify-end">
      <Button
        type="button"
        onClick={handleLogin}
        size="small"
        label="Giriş Yap"
        loading={isLoading}
      />
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse">
      <Dropdown
        isSearchable
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
          />
          <span className="text-sm font-semibold text-gray-700 max-lg:hidden">
            {user?.name}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderProfile;
