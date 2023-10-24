import React from "react";
import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";

const Header = () => {
  return (
    <div className="text-xs leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse mx-12 max-md:mx-0">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </div>
  );
};

export default Header;
