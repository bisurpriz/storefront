"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import { getLocale } from "@/middleware";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLogIn } from "react-icons/fi";

const HeaderMiddle = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="w-full h-[120px] py-6 max-sm:h-auto max-md:mx-4 flex items-center sm:gap-8 container mx-auto">
      <Image
        src={"https://nest-nextjs-13.vercel.app/assets/imgs/theme/logo.svg"}
        width={180}
        height={55}
        alt="BiSürpriz Logo"
        className="mr-8"
        priority
      />
      <Search
        onChange={(value) => console.log(value)}
        onSubmit={() => console.log("submit")}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: i.toString(),
          label: `Option ${i}`,
        }))}
        value="1"
      />
      <Dropdown
        onChange={(value) => console.log(value)}
        options={Array.from({ length: 10 }, (_, i) => ({
          value: i.toString(),
          label: `Option ${i}`,
        }))}
        isSearchable
        dropdownPlacement="bottomLeft"
        label="Select"
        noOptionsMessage="No options"
      />
      {!user ? (
        <Button
          icon={<FiLogIn />}
          type="button"
          onClick={() => router.push(`${getLocale()}/api/auth/login`)}
        />
      ) : (
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <Image
              src={user?.picture || ""}
              width={30}
              height={30}
              alt="User Picture"
              className="rounded-full"
            />
            <span>{user?.name}</span>
          </div>
          <Button
            type="button"
            onClick={() => router.push(`${getLocale()}/api/auth/logout`)}
            label="Logout"
            size="small"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderMiddle;
