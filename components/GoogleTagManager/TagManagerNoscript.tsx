import React from "react";

const TagManagerNoscript = () => {
  if (process.env.NODE_ENV === "development") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=GTM-W955HJVG`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  );
};

export default TagManagerNoscript;
