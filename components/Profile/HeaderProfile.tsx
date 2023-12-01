import React from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
import { profileItems } from "./contants";
import {
  LoginLink,
  useKindeBrowserClient,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import Button from "../Button";

const HeaderProfile = () => {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();

  return !isAuthenticated ? (
    <div className="flex items-center justify-end gap-4 ml-2">
      <LoginLink>
        <Button
          type="button"
          size="small"
          label="Giriş Yap"
          loading={isLoading}
        />
      </LoginLink>
      <RegisterLink>
        <Button
          type="button"
          size="small"
          label="Kayıt Ol"
          loading={isLoading}
        />
      </RegisterLink>
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse">
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
            {user?.given_name + " " + user?.family_name}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderProfile;
