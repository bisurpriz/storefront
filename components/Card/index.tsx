import React from "react";
import Divider from "../Divider";

const Card = ({
  children,
  title,
  wrapperClass,
  titleClass,
  contentClass,
  bordered = true,
}: {
  children: React.ReactNode;
  title?: string;
  wrapperClass?: string;
  titleClass?: string;
  contentClass?: string;
  bordered?: boolean;
}) => {
  const isBordered = bordered ? "border rounded-md border-primary-light" : "";
  const containerCls = wrapperClass ?? "";
  const titleCls = titleClass ?? "";
  const contentCls = contentClass ?? "";

  return (
    <div className={`${isBordered} ${containerCls}`}>
      {title && (
        <div
          className={`text-center text-md font-bold text-gray-800 p-4 ${titleCls}`}
        >
          {title}
        </div>
      )}
      {title && <Divider orientation="horizontal" />}
      <div className={`p-4 ${contentCls}`}>{children}</div>
    </div>
  );
};

export default Card;
