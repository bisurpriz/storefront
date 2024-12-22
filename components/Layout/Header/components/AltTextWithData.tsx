"use client";

import { User } from "@/graphql/generated-types";
import { HeaderButtonData } from "./HeaderButtons";

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
  const altText = () => {
    switch (type) {
      case "order":
        return "Görüntüle";
      case "account": {
        const user = data as User;
        if (user) {
          return getUsernameWithSurname(user);
        } else return "Giriş Yap";
      }
      case "cart": {
        const cost = data as number;
        return cost ? `${cost?.toFixed(2)} ₺` : "0.00 ₺";
      }
    }
  };

  return (
    <span className="line-clamp-2 h-4 overflow-hidden text-ellipsis text-xs text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-600 max-md:hidden">
      {altText()}
    </span>
  );
};

export default AltTextWithData;
