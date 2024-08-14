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
      <div className="w-full absolute top-0 left-0 z-0 max-h-44 rounded-xl h-40 bg-gradient-to-r from-[#a855f757] via-[#7511d454] to-[#ff7bbc] max-md:h-32" />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-[1]">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <Image
            src={getImageUrlFromPath(logoUrl)}
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full max-md:w-24"
            width={170}
            height={170}
          />
          <div className="block ml-4">
            <h3 className="font-manrope font-bold text-xl text-gray-900 mb-3 max-sm:text-center max-md:text-base">
              {title}
            </h3>
            <p className="font-bold text-base leading-7 text-gray-500  max-sm:text-center">
              {productsCount} ürün <span>•</span> {reviewsCount} değerlendirme
            </p>
          </div>
        </div>
      </div>
    </section>
  ); 
};

export default TenantHeader;
