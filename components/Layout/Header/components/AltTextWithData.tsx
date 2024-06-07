"use client";

import React from "react";
import { HeaderButtonData } from "./HeaderButtons";
import { User } from "@/graphql/generated";

const getUsernameWithSurname = (user: User) => {
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
      if (user.firstname) {
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
    <span className="text-xs h-4 text-gray-400 max-md:hidden group-hover:text-gray-600 transition-colors duration-300 ease-in-out">
      {altText}
    </span>
  );
};

export default AltTextWithData;
