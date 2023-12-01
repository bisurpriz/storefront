import React from "react";
import TextInput from "../TextField";
import { CustomizableArea } from "@/common/types/Order/order";
import ImageUpload from "../ImageUpload";
import { SpecialInstructions } from "@/store/cart";

interface Area extends Omit<CustomizableArea, "id"> {
  values?: SpecialInstructions;
  count: number;
}

const CustomizeCartItem = ({ type, count, values }: Area) => {
  switch (type) {
    case "special_text":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div className="flex items-center gap-3 whitespace-nowrap" key={i}>
            <span className="font-semibold">Yazı {i + 1}:</span>
            <TextInput
              className="w-full"
              placeholder="Özel Yazı Giriniz"
              id={`special_text_${i}`}
              defaultValue={values?.[`special_text_${i}`] as string}
            />
          </div>
        ));
    case "special_image":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div className="flex items-center gap-3 whitespace-nowrap" key={i}>
            <span className="font-semibold">Görsel {i + 1}:</span>
            <ImageUpload
              id={`special_image_${i}`}
              onChange={(file) => {}}
              defaultValue={values?.[`special_image_${i}`] as string}
            />
          </div>
        ));
    default:
      return null;
  }
};

export default CustomizeCartItem;
