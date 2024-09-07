import { orderTextsUpload } from "@/app/account/orders/actions";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import Button from "@/components/Button";
import CustomizeCartItem from "@/components/Customize/CustomizeCartItem";
import { GetOrderByIdQuery } from "@/graphql/queries/order/order.generated";
import { useRouter } from "next/navigation";
import React, { FC, Fragment } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/contexts/CartContext";

type CustomizeOrderItemProps = {
  orderItem: GetOrderByIdQuery["order_by_pk"]["tenant_orders"][0]["order_items"][0];
};

type HandleCustomizerProps = {
  quantityIndex: number;
  type: "special_text" | "special_image";
  value: string | File | File[];
};

type CustomizerImages = {
  index: number;
  image: File | File[];
};

type CustomizerTexts = {
  index: number;
  text: string;
};

const CustomizeOrderItem: FC<CustomizeOrderItemProps> = ({
  orderItem: {
    quantity,
    order_item_special_images,
    order_item_special_texts,
    product: { product_customizable_areas },
    id,
  },
}) => {
  const [customizerImages, setCustomizerImages] = React.useState<
    CustomizerImages[]
  >([]);
  const [customizerTexts, setCustomizerTexts] = React.useState<
    CustomizerTexts[]
  >([]);
  const [imageUploadStatus, setImageUploadStatus] =
    React.useState<boolean>(false);
  const [textUploadStatus, setTextUploadStatus] =
    React.useState<boolean>(false);

  const handleChange = ({
    quantityIndex,
    type,
    value,
  }: HandleCustomizerProps) => {
    if (type === "special_text") {
      setCustomizerTexts((prev) => {
        const updatedTexts = [...prev];
        updatedTexts[quantityIndex] = {
          index: quantityIndex,
          text: value as string,
        };
        return updatedTexts;
      });
    }
    if (type === "special_image") {
      setCustomizerImages((prev) => {
        const updatedImages = [...prev];
        updatedImages[quantityIndex] = {
          index: quantityIndex,
          image: value as File | File[],
        };
        return updatedImages;
      });
    }
  };

  const handleUpload = async () => {
    if (
      product_customizable_areas.find(
        (z) => z.customizable_area.type === "special_image"
      ) &&
      customizerImages.length !== quantity
    ) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }
    if (
      product_customizable_areas.find(
        (z) => z.customizable_area.type === "special_text"
      ) &&
      customizerTexts.length !== quantity
    ) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const all = customizerImages.map((imageObj) => {
      const formData = new FormData();
      if ((imageObj.image as File[]).length > 0) {
        (imageObj.image as File[]).forEach((image) => {
          formData.append("items", image);
        });
      } else {
        formData.append("items", imageObj.image as File);
      }

      formData.append("order_item_id", id.toString());
      formData.append("quantity_index", imageObj.index.toString());

      return fetch(
        "https://mmcvpm3nmlyqbt2uiyr5h5optm0pihfu.lambda-url.eu-north-1.on.aws/ ",
        {
          method: "POST",
          body: formData,
        }
      );
    });

    const res = await Promise.all(all);

    if (res.some((r) => r.status !== 200)) {
      setImageUploadStatus(false);
      return;
    }

    if (res.every((r) => r.status === 200)) {
      setImageUploadStatus(true);
    }

    if (customizerTexts.length > 0) {
      const res = await orderTextsUpload(
        customizerTexts.map((textObj) => {
          return {
            order_item_id: id,
            content: textObj.text,
            quantity_index: textObj.index,
          };
        })
      );

      if (res.errors) {
        setTextUploadStatus(false);
        return;
      }

      if (res.data.insert_order_item_special_text.affected_rows) {
        setTextUploadStatus(true);
      }
    }
  };

  return (
    <>
      {Array.from({ length: quantity }).map((_, _index) => (
        <Fragment key={_index}>
          {product_customizable_areas.map((area, _id) => {
            return (
              <div className="w-full my-2" key={`${_index}-${_id}`}>
                <CustomizeCartItem
                  count={area.count}
                  keyIndex={_index}
                  values={[
                    ...order_item_special_texts,
                    ...order_item_special_images,
                  ]}
                  maxCharacter={area.max_character}
                  isDisabled={textUploadStatus || imageUploadStatus}
                  onChange={(_, type, value) =>
                    handleChange({
                      quantityIndex: _index,
                      type,
                      value,
                    })
                  }
                  id={area?.customizable_area.id}
                  key={area?.customizable_area.type}
                  type={area?.customizable_area.type as CustomizableAreaType}
                />
              </div>
            );
          })}
        </Fragment>
      ))}
      <Button
        type="button"
        variant="fullfilled"
        className="w-fit"
        label="Kaydet"
        onClick={handleUpload}
        disabled={textUploadStatus || imageUploadStatus}
        loading={textUploadStatus || imageUploadStatus}
      />
    </>
  );
};

export default CustomizeOrderItem;
