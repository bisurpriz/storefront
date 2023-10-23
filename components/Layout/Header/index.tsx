import React from "react";
import HeaderTop from "./Top";
import HeaderMiddle from "./Middle";
import HeaderBottom from "./Bottom";

const Header = () => {
  return (
    <div className="md:container mx-auto py-2 text-xs leading-none max-sm:flex max-sm:flex-col-reverse">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </div>
  );
};

export default Header;
