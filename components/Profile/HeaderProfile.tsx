import React from "react";
import Button from "../Button";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Tooltip from "../Tooltip";

const HeaderProfile = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    router.push(`/api/auth/logout`);
  };

  const handleLogin = () => {
    router.push(`/api/auth/login`);
  };

  return !user ? (
    <div className="flex items-center justify-end">
      <Tooltip text="Giriş Yap">
        <Button
          type="button"
          onClick={handleLogin}
          size="small"
          label="Giriş Yap"
        />
      </Tooltip>
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse">
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
      <Tooltip text="Çıkış yap">
        <Button
          type="button"
          onClick={handleLogout}
          size="small"
          icon={<LuLogOut />}
        />
      </Tooltip>
    </div>
  );
};

export default HeaderProfile;
