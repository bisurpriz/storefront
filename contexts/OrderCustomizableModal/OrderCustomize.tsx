"use client";

import { orderTextsUpload } from "@/app/account/orders/actions";
import { createJwt } from "@/app/actions";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import CustomizeCartItem from "@/components/Customize/CustomizeCartItem";
import { Button } from "@/components/ui/button";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type OrderCustomizeProps = {
  order: GetUserOrdersQuery["order"][0];
  onStatusChange: (status: "succes" | "fail") => void;
};

export type OrderImageData = {
  order_item_id: number;
  quantity_index: number;
  images: File[];
};

export type OrderTextData = {
  order_item_id: number;
  quantity_index: number;
  content: string;
  id?: number;
};

const OrderCustomize: FC<OrderCustomizeProps> = ({ order, onStatusChange }) => {
  const [selectedImageData, setSelectedImageData] = useState<OrderImageData[]>(
    [],
  );
  const [selectedTextData, setSelectedTextData] = useState<OrderTextData[]>([]);
  const [loading, setLoading] = useState(false);
  const { refresh } = useRouter();

  const handleUpload = async () => {
    setLoading(true);
    const jwt = await createJwt();
    if (selectedImageData.length > 0) {
      const all = selectedImageData.map((d) => {
        const formData = new FormData();
        d.images.forEach((image) => {
          formData.append("items", image);
          formData.append("order_item_id", d.order_item_id.toString());
          formData.append("quantity_index", d.quantity_index.toString());
        });

        return fetch(process.env.NEXT_PUBLIC_UPDATE_ORDER_ITEM_IMAGE_URL, {
          method: "POST",
          body: formData,
          headers: {
            authorization: jwt,
          },
        });
      });

      const res = await Promise.all(all);

      if (res.some((r) => r.status !== 200)) {
        onStatusChange("fail");
      }

      if (res.every((r) => r.status === 200)) {
        onStatusChange("succes");
        refresh();
      }
    }

    if (selectedTextData.length > 0) {
      const { insert_order_item_special_text, errors } =
        await orderTextsUpload(selectedTextData);
      if (errors) {
        onStatusChange("fail");
      }

      if (insert_order_item_special_text.affected_rows) {
        onStatusChange("succes");
        refresh();
      }
    }
    setLoading(false);
  };

  const handleChange = async ({
    inputIndex,
    type,
    value,
    order_item_id,
    specialTextId,
  }: {
    inputIndex: number;
    type: "special_text" | "special_image";
    value: string | File[];
    order_item_id: number;
    specialTextId?: number;
  }) => {
    if (type === "special_image") {
      setSelectedImageData((prev) => [
        ...prev,
        { order_item_id, quantity_index: inputIndex, images: value as File[] },
      ]);
    }

    if (type === "special_text") {
      const newData = selectedTextData.map((d) => {
        if (
          d.order_item_id === order_item_id &&
          d.quantity_index === inputIndex
        ) {
          return { ...d, content: value as string };
        }
        return d;
      });

      if (
        !newData.some(
          (d) =>
            d.order_item_id === order_item_id &&
            d.quantity_index === inputIndex,
        )
      ) {
        newData.push({
          order_item_id,
          quantity_index: inputIndex,
          content: value as string,
          id: specialTextId,
        });
      }

      setSelectedTextData(newData);
    }
  };

  return (
    <div>
      <div className="w-full">
        {order.tenant_orders.map((to) => (
          <>
            {to.order_items.map((oi, i) => (
              <div className="w-full" key={`customize-${oi.id}-${i}`}>
                {Array.from({ length: oi.quantity }).map((_, index) => {
                  return (
                    <>
                      <div className="mb-4 flex items-start gap-2" key={index}>
                        <Image
                          src={getImageUrlFromPath(oi?.product?.image_url[0])}
                          width={100}
                          height={100}
                          alt={oi.product.name}
                          className="h-20 w-20 rounded-lg object-contain"
                          priority
                        />
                        <span className={clsx("text-sm text-gray-700")}>
                          {oi.product.name}
                        </span>
                      </div>
                      {oi?.product?.product_customizable_areas.map(
                        (area, _id) => {
                          return (
                            <div className="my-2 w-full" key={_id}>
                              <CustomizeCartItem
                                count={area.count}
                                keyIndex={index}
                                values={[
                                  ...oi.order_item_special_texts,
                                  ...oi.order_item_special_images,
                                ]}
                                maxCharacter={area.max_character}
                                isDisabled={loading}
                                onChange={(inputIndex, type, value) =>
                                  handleChange({
                                    inputIndex,
                                    type,
                                    value,
                                    order_item_id: oi.id,
                                    specialTextId:
                                      oi.order_item_special_texts[i]?.id,
                                  })
                                }
                                id={area?.customizable_area.id}
                                key={area?.customizable_area.type}
                                type={
                                  area?.customizable_area
                                    .type as CustomizableAreaType
                                }
                              />
                            </div>
                          );
                        },
                      )}
                    </>
                  );
                })}
              </div>
            ))}
          </>
        ))}
      </div>
      {order.tenant_orders.find(
        (to) =>
          to.order_items.reduce((acc, oi) => {
            return (
              acc +
              oi.product.product_customizable_areas.reduce(
                (acc2, area) => acc2 + area.count,
                0,
              )
            );
          }, 0) !==
          to.order_items.reduce((acc, oi) => {
            return (
              acc +
              oi.order_item_special_images.length +
              oi.order_item_special_texts.length
            );
          }, 0),
      )?.id && (
        <div className="flex w-full justify-end">
          <Button
            type="button"
            size="sm"
            variant="default"
            className="self-end"
            onClick={handleUpload}
            disabled={loading}
            loading={loading}
          >
            Onayla ve Yükle
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderCustomize;
