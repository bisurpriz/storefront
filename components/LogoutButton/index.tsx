"use client";

import { logout } from "@/app/@auth/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { refresh } = useRouter();

  return (
    <span
      className={clsx(
        "text-sm text-white hover:text-slate-100",
        "flex items-center justify-center gap-1",
        "max-lg:mt-2",
        "max-lg:text-xs",
        "w-full",
        "bg-red-400",
        "rounded-md",
        "p-2",
        "cursor-pointer h-10",
      )}
      onClick={async () => {
        logout();
        refresh();
      }}
    >
      Çıkış Yap
    </span>
  );
};

export default LogoutButton;
