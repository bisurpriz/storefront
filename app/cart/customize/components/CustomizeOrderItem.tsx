import { orderTextsUpload } from "@/app/account/orders/actions";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import TextField from "@/components/TextField";
import { GetOrderByIdQuery } from "@/graphql/queries/order/order.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, Fragment, useEffect, useState } from "react";

type CustomizeOrderItemProps = {
  orderItem: GetOrderByIdQuery["order_by_pk"]["tenant_orders"][0]["order_items"][0];
};

type TextType = {
  content: string;
  quantity_index: number;
};

type ImageType = {
  imageFile: File[];
  quantity_index: number;
};

const CustomizeOrderItem: FC<CustomizeOrderItemProps> = ({ orderItem }) => {
  const {
    id,
    order_item_special_images,
    order_item_special_texts,
    product,
    quantity,
  } = orderItem;
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>(null);
  const [selectedText, setSelectedText] = useState<TextType[]>(null);
  const [status, setStatus] = useState<string>(null);
  const { refresh } = useRouter();
  const handleTextChange = (val, quantity_index) => {
    setSelectedText((prev) => {
      if (!prev) return [{ content: val, quantity_index }];
      const newSelectedText = [...prev];
      const index = newSelectedText.findIndex(
        (text) => text.quantity_index === quantity_index
      );
      if (index === -1) {
        newSelectedText.push({
          content: val,
          quantity_index,
        });
      } else {
        newSelectedText[index] = {
          content: val,
          quantity_index,
        };
      }
      return newSelectedText;
    });
  };

  const handleImageChange = (files, quantity_index) => {
    setSelectedImages((prev) => {
      if (!prev) return [{ imageFile: files, quantity_index }];
      const newSelectedImages = [...prev];
      const index = newSelectedImages.findIndex(
        (image) => image.quantity_index === quantity_index
      );
      if (index === -1) {
        newSelectedImages.push({
          imageFile: files,
          quantity_index,
        });
      } else {
        newSelectedImages[index] = {
          imageFile: files,
          quantity_index,
        };
      }
      return newSelectedImages;
    });
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      if (selectedImages?.length > 0) {
        const all = selectedImages.map((d) => {
          const formData = new FormData();
          d.imageFile.forEach((image) => {
            formData.append("items", image);
            formData.append("order_item_id", id.toString());
            formData.append("quantity_index", d.quantity_index.toString());
          });
          return fetch(process.env.NEXT_PUBLIC_UPDATE_ORDER_ITEM_IMAGE_URL, {
            method: "POST",
            body: formData,
          });
        });

        const res = await Promise.all(all);

        if (res.some((r) => r.status !== 200)) {
          setStatus("fail");
          return;
        }
      }

      if (selectedText?.length > 0) {
        const res = await orderTextsUpload(
          selectedText.map((t) => ({
            content: t.content,
            order_item_id: id,
            quantity_index: t.quantity_index,
          }))
        );

        if (res.errors) {
          setStatus("fail");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setStatus("success");
  };

  useEffect(() => {
    if (status === "success") {
      refresh();
    }
  }, [status]);

  const disableButton =
    order_item_special_images?.length === quantity ||
    order_item_special_texts?.length === quantity;

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: quantity }).map((_, quantity_index) => (
        <div
          key={quantity_index}
          className="flex flex-col gap-4 relative rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-600 font-semibold font-mono whitespace-nowrap">
              {quantity_index + 1}. ürün özelleştirmesi
            </p>
            {product.product_customizable_areas?.map((area, tindex) => {
              const hasSpecialImage = order_item_special_images?.find(
                (specialImage) => specialImage.quantity_index === quantity_index
              );
              const hasSpecialText = order_item_special_texts?.find(
                (specialText) => specialText.quantity_index === quantity_index
              );
              return area.customizable_area.type ===
                CustomizableAreaType.TEXT ? (
                <Fragment key={tindex}>
                  <TextField
                    label={"Özel Metin"}
                    value={hasSpecialText?.content}
                    disabled={Boolean(hasSpecialText?.content) || loading}
                    onChange={(e, val) => handleTextChange(val, quantity_index)}
                    placeholder="Özel metin giriniz"
                  />
                </Fragment>
              ) : (
                <Fragment key={tindex}>
                  {hasSpecialImage ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={getImageUrlFromPath(hasSpecialImage.image_url)}
                        alt="Special Image"
                        width={64}
                        height={64}
                      />
                    </div>
                  ) : (
                    <ImageUpload
                      onChange={(files) => {
                        handleImageChange(files, quantity_index);
                      }}
                      maxCharacter={area.count}
                      disabled={loading || Boolean(hasSpecialImage)}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      ))}
      <Button
        variant="fullfilled"
        color="primary"
        type="button"
        className="mt-4 w-full justify-center"
        loading={loading}
        disabled={loading || status === "success" || disableButton}
        onClick={handleUpload}
      >
        {disableButton
          ? "Tüm özelleştirmeler tamamlandı"
          : "Özelleştirmeleri Kaydet"}
      </Button>
    </div>
  );
};

export default CustomizeOrderItem;
