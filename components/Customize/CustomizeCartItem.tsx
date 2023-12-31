"use client";

import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { memo } from "react";
import { CustomizableArea } from "@/common/types/Order/order";

interface Area extends Partial<CustomizableArea> {
  count: number;
}

const CustomizeCartItem = ({ type, count, values }: Area) => {
  switch (type) {
    case "special_text":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex items-center gap-3 whitespace-nowrap font-sans"
            key={i}
          >
            <TextField
              fullWidth
              placeholder="Lütfen istediğiniz yazıyı giriniz."
              id={`${type}_${i}`}
              defaultValue={values?.[i][`${type}_${i}`] as string}
              label={`Özel Yazı ${i + 1}:`}
            />
          </div>
        ));
    case "special_image":
      return Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex items-center gap-3 whitespace-nowrap font-sans"
            key={i}
          >
            <ImageUpload
              id={`${type}_${i}`}
              onChange={(file) => {}}
              defaultValue={values?.[i][`${type}_${i}`] as string}
              label={`Özel Resim ${i + 1}:`}
            />
          </div>
        ));
    default:
      return null;
  }
};

export default memo(CustomizeCartItem);
