"use client";

import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { memo } from "react";
import { CustomizableArea } from "@/common/types/Order/order";
import { CustomizableAreaType } from "@/common/enums/Order/product";

interface Area extends Partial<CustomizableArea> {
  count: number;
  maxCharacter: number;
}

interface CustomizeCartItemProps extends Area {
  onChange: (type, value) => void;
}

const CustomizeCartItem = ({
  type,
  count,
  values,
  onChange,
  maxCharacter,
}: CustomizeCartItemProps) => {
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
              onChange={(e) => {
                onChange(CustomizableAreaType.TEXT, e.target.value);
              }}
              maxLength={maxCharacter}
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
              defaultValue={values?.[i][`${type}_${i}`] as string}
              label={`Özel Resim ${i + 1}:`}
              onChange={(files) => {
                onChange(CustomizableAreaType.IMAGE, files);
              }}
              count={count}
            />
          </div>
        ));
    default:
      return null;
  }
};

export default memo(CustomizeCartItem);
