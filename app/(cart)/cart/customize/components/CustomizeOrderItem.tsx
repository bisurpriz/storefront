import { orderTextsUpload } from "@/app/(account)/account/orders/actions";
import { createJwt } from "@/app/actions";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import ImageUpload from "@/components/ImageUpload";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { GetOrderByIdQuery } from "@/graphql/queries/order/order.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";

type CustomizeOrderItemProps = {
  orderItem: GetOrderByIdQuery["order_by_pk"]["tenant_orders"][0]["order_items"][0];
};

type TextType = {
  content: string;
  quantity_index: number;
  keyIndex: number;
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
  const handleTextChange = (val, quantity_index, keyIndex) => {
    setSelectedText((prev) => {
      if (!prev) return [{ content: val, quantity_index, keyIndex }];
      const newSelectedText = [...prev];
      const index = newSelectedText.findIndex(
        (text) =>
          text.quantity_index === quantity_index && text.keyIndex === keyIndex,
      );

      if (index === -1) {
        newSelectedText.push({
          content: val,
          quantity_index,
          keyIndex,
        });
      } else {
        newSelectedText[index] = {
          content: val,
          quantity_index,
          keyIndex,
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
        (image) => image.quantity_index === quantity_index,
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
    const jwt = await createJwt();
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
            headers: {
              authorization: `${jwt}`,
            },
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
          selectedText.map((text) => ({
            content: text.content,
            order_item_id: id,
            quantity_index: text.quantity_index,
          })),
        );

        if (res.errors) {
          setStatus("fail");
          return;
        }
      }
    } catch (error) {
      console.error(error);
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
    orderItem.product.product_customizable_areas.reduce(
      (acc, pca) => acc + quantity * pca.count,
      0,
    ) ===
    (order_item_special_images?.length || 0) +
      (order_item_special_texts?.length || 0);

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: quantity }).map((_, quantity_index) => (
        <div
          key={quantity_index}
          className="relative flex flex-col gap-4 rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold whitespace-nowrap text-slate-600">
              {quantity_index + 1}. ürün özelleştirmesi
            </p>
            {product.product_customizable_areas?.map((area, tindex) => {
              const hasSpecialImage = order_item_special_images?.filter(
                (specialImage) =>
                  specialImage?.quantity_index === quantity_index,
              );

              const hasSpecialText = order_item_special_texts?.filter(
                (specialText) => specialText?.quantity_index === quantity_index,
              );
              return area.customizable_area.type ===
                CustomizableAreaType.TEXT ? (
                <Fragment key={tindex}>
                  {Array.from({ length: area.count }).map((_, keyIndex) => (
                    <TextField
                      key={keyIndex}
                      label={`Özel Metin ${keyIndex + 1}`}
                      value={hasSpecialText[keyIndex]?.content}
                      disabled={
                        Boolean(hasSpecialText[keyIndex]?.content) || loading
                      }
                      onChange={(e, val) =>
                        handleTextChange(val, quantity_index, keyIndex)
                      }
                      placeholder="Özel metin giriniz"
                    />
                  ))}
                </Fragment>
              ) : (
                <Fragment key={tindex}>
                  {hasSpecialImage.length ? (
                    <div className="flex flex-wrap gap-4">
                      {Array.from({ length: area.count }).map((_, keyIndex) => (
                        <div
                          key={`special-image-${keyIndex}`}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src={getImageUrlFromPath(
                              hasSpecialImage[keyIndex]?.image_url,
                            )}
                            alt="Special Image"
                            width={64}
                            height={64}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ImageUpload
                      onChange={(files) => {
                        handleImageChange(files, quantity_index);
                      }}
                      maxCharacter={area.count}
                      disabled={loading || Boolean(hasSpecialImage.length)}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      ))}
      <Button
        variant="default"
        type="button"
        className="justify-center w-full mt-4"
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
