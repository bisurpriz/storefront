import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import React from "react";

interface TenantHeaderProps {
  title: string;
  joinedDate: string;
  logoUrl: string;
  id: string;
  productsCount: number;
  reviewsCount: number;
}

const TenantHeader = ({
  title,
  joinedDate,
  logoUrl,
  id,
  productsCount,
  reviewsCount,
}: TenantHeaderProps) => {
  return (
    <section className="relative pt-20">
      <div className="absolute left-0 top-0 z-0 h-40 max-h-44 w-full rounded-xl bg-gradient-to-r from-[#a855f757] via-[#7511d454] to-[#ff7bbc] max-md:h-32" />
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="relative z-10 mb-5 flex items-center justify-center sm:justify-start">
          <Image
            src={getImageUrlFromPath(logoUrl)}
            alt="user-avatar-image"
            className="rounded-full border-4 border-solid border-white max-md:w-24"
            width={170}
            height={170}
          />
          <div className="ml-4 block">
            <h3 className="mb-3 font-manrope text-xl font-bold text-gray-900 max-md:text-base max-sm:text-center">
              {title}
            </h3>
            <p className="text-base font-bold leading-7 text-gray-500 max-sm:text-center">
              {productsCount} ürün <span>•</span> {reviewsCount} değerlendirme
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantHeader;
