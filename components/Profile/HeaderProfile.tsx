import React from "react";
import Button from "../Button";
import { FiLogIn } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getLocale } from "@/middleware";
import Tooltip from "../Tooltip";

const HeaderProfile = () => {
  const router = useRouter();
  const { user } = useUser();

  return !user ? (
    <div className="flex items-center justify-end">
      <Tooltip text="Giriş Yap">
        <Button
          type="button"
          onClick={() =>
            router.push(`${getLocale()}/api/auth/login`, {
              scroll: true,
            })
          }
          size="small"
          label="Giriş Yap"
        />
      </Tooltip>
    </div>
  ) : (
    <div className="flex gap-4 items-center justify-end">
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
          onClick={() => router.push(`${getLocale()}/api/auth/logout`)}
          size="small"
          icon={<LuLogOut />}
        />
      </Tooltip>
    </div>
  );
};

export default HeaderProfile;
