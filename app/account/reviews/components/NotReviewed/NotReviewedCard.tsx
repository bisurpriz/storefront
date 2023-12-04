import Rating from "@/components/Rating/Rating";
import { localeFormat } from "@/utils/format";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import React from "react";
import ClientModal from "./ClientModal";

const NotReviewedCard = () => {
  return (
    <div className="flex items-center gap-4 border p-4 shadow-md rounded-md max-sm:flex-col max-sm:items-center max-sm:w-full">
      <Image
        src={faker.image.imageUrl(200, 200, undefined, true)}
        alt="product"
        width={200}
        height={200}
        className="rounded-md object-cover w-32 h-32 shadow-md"
      />
      <div className="flex flex-col items-start justify-end font-mono">
        <h4 className="text-lg font-semibold text-slate-700 max-w-xs m-0">
          {faker.commerce.productName()}
        </h4>
        <p className="text-xs m-0 leading-none text-slate-500 max-w-lg mt-0 whitespace-nowrap mb-2">
          Teslim tarihi: {localeFormat(faker.date.past(), "dd MMMM yyyy")}
        </p>
        <div className="flex gap-2 items-end mb-2 text-xs text-slate-400">
          {/* 
            Halihazırda bu ürünün kendi değerlendirmesi görüntülenecek
          */}
          <Rating
            value={faker.datatype.number({ min: 1, max: 5 })}
            readOnly
            showReviewCount={false}
          />
          ({faker.datatype.number({ min: 1, max: 100 })})
        </div>

        <ClientModal />
      </div>
    </div>
  );
};

export default NotReviewedCard;
