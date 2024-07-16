"use client";

import React from "react";
import { HeaderButtonData } from "./HeaderButtons";
import { User } from "@/graphql/generated-types";

const getUsernameWithSurname = (user: User) => {
  if (!user.firstname) return user.lastname;
  return `${user.firstname} ${user.lastname.split("")[0]}.`;
};

const AltTextWithData = ({
  type,
  data,
}: {
  type: HeaderButtonData["type"];
  data: any;
}) => {
  let altText = "";

  switch (type) {
    case "order":
      altText = "Görüntüle";
      break;
    case "account": {
      const user = data as User;
      if (user) {
        altText = getUsernameWithSurname(user);
      } else altText = "Giriş Yap";
      break;
    }
    case "cart":
      {
        const cost = data as number;
        altText = cost ? `${cost} ₺` : "0 ₺";
      }
      break;
  }

  return (
    <span className="text-xs h-4 text-gray-400 max-md:hidden group-hover:text-gray-600 transition-colors duration-300 ease-in-out line-clamp-2 overflow-hidden text-ellipsis">
      {altText}
    </span>
  );
};

export default AltTextWithData;
