import { orderTextsUpload } from "@/app/account/orders/actions";
import { createJwt } from "@/app/actions";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import Button from "@/components/Button";
import CustomizeCartItem from "@/components/Customize/CustomizeCartItem";
import { GetUserOrdersQuery } from "@/graphql/queries/account/account.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

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
    []
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

        return fetch(
          process.env.NEXT_PUBLIC_UPDATE_ORDER_ITEM_IMAGE_URL,
          {
            method: "POST",
            body: formData,
            headers: {
              authorization: jwt,
            }
          }
        );
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
      const res = await orderTextsUpload(selectedTextData);
      if (res.errors) {
        onStatusChange("fail");
      }

      if (res.data.insert_order_item_special_text.affected_rows) {
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
            d.order_item_id === order_item_id && d.quantity_index === inputIndex
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
    <div
      className={clsx(
        "flex items-start justify-center flex-col gap-2 p-4 pt-2",
        "text-lg font-semibold text-primary w-full"
      )}
    >
      <div className="w-full font-manrope">
        {order.tenant_orders.map((to) => (
          <>
            {to.order_items.map((oi, i) => (
              <div className="w-full" key={i}>
                {Array.from({ length: oi.quantity }).map((_, index) => (
                  <>
                    <p className="text-sm text-slate-400">{index + 1}. Ürün</p>
                    <span className={clsx("text-base max-w-sm text-primary")}>
                      {oi.product.name}
                    </span>
                    <Image
                      src={getImageUrlFromPath(oi?.product?.image_url[0])}
                      width={100}
                      height={100}
                      alt={oi.product.name}
                      className="object-contain w-20 h-20 rounded-lg my-2"
                      priority
                    />
                    {oi?.product?.product_customizable_areas.map(
                      (area, _id) => {
                        return (
                          <div className="w-full my-2" key={_id}>
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
                      }
                    )}
                  </>
                ))}
              </div>
            ))}
          </>
        ))}
      </div>
      <Button
        type="button"
        size="small"
        color="primary"
        label="Tamamla"
        className="mt-2 self-end"
        onClick={handleUpload}
        disabled={loading}
        loading={loading}
      >
        Onayla ve Yükle
      </Button>
    </div>
  );
};

export default OrderCustomize;
