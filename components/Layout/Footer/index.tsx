import React from "react";

const Footer = () => {
  return (
    <footer
      aria-label="Alt Bilgi"
      aria-describedby="Alt bilgi"
      className="flex items-center justify-center w-full h-24 mt-12 bg-1 max-md:hidden"
    >
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">
          © 2023 Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
