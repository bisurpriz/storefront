import clsx from "clsx";
import Link from "next/link";
import React from "react";

const EmptyPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-center gap-12 font-manrope">
        <Link
          href="/"
          className="text-[120px] leading-none font-bold text-gray-500 m-0"
        >
          404
        </Link>
        <p className="text-[40px] font-semibold text-gray-500 m-0">
          Aradığın içeriğe şu an ulaşılamıyor.
        </p>

        <Link
          href="/"
          className={clsx(
            "px-6 py-4 text-[30px] rounded-md bg-secondary text-white font-semibold",
            "hover:bg-secondary-dark transition-colors"
          )}
        >
          Anasayfa
        </Link>
      </div>
    </div>
  );
};

export default EmptyPage;
