"use client";

import { CustomizableAreaType } from "@/common/enums/Order/product";
import Button from "@/components/Button";
import CustomizeCartItem from "@/components/Customize/CustomizeCartItem";
import { GetOrderByIdQuery } from "@/graphql/queries/order/order.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import React, { FC, Fragment } from "react";
import CustomizeOrderItem from "./CustomizeOrderItem";

type CustomizerProps = {
  tenant_order: GetOrderByIdQuery["order_by_pk"]["tenant_orders"][0];
};

const Customizer: FC<CustomizerProps> = ({ tenant_order }) => {
  return tenant_order.order_items.map((oi, oindex) => (
    <div className="grid grid-cols-12 gap-4" key={oi.product.name + oindex}>
      <div className="flex items-start justify-center col-span-4 max-lg:col-span-6 max-md:col-span-full">
        <Image
          src={getImageUrlFromPath(oi.product.image_url[0])}
          alt="Product Image"
          width={320}
          height={320}
          className="rounded-lg max-w-xs object-cover shadow-sm"
          style={{
            aspectRatio: "320/320",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="flex flex-col gap-1 col-span-8 max-lg:col-span-6 max-md:col-span-full">
        <div>
          <h1 className="text-2xl font-bold font-mono">{oi.product.name}</h1>
          <span className="text-xs text-slate-400">Adet: {oi.quantity}</span>
        </div>
        <CustomizeOrderItem orderItem={oi} />
      </div>
    </div>
  ));
};

export default Customizer;
