"use client";

import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { CustomizableArea } from "@/common/types/Order/order";
import { CustomizableAreaType } from "@/common/enums/Order/product";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface Area extends Partial<CustomizableArea> {
  count: number;
  maxCharacter: number;
  keyIndex: number;
}

interface CustomizeCartItemProps extends Area {
  onChange: (
    inputIndex: number,
    type: "special_text" | "special_image",
    value: string | File[],
  ) => void;
  isDisabled: boolean;
}

const CustomizeCartItem = ({
  type,
  count,
  values,
  onChange,
  maxCharacter,
  keyIndex,
  isDisabled = false,
}: CustomizeCartItemProps) => {
  switch (type) {
    case "special_text":
      return Array(count)
        .fill(0)
        .map((_, i) => {
          const value = values[keyIndex]?.content as string;
          return (
            <div
              className="flex items-center gap-3 whitespace-nowrap font-sans"
              key={`${_}_${i}`}
            >
              <TextField
                fullWidth
                placeholder="Lütfen istediğiniz yazıyı giriniz."
                id={`${type}_${i}`}
                defaultValue={value}
                className="h-12"
                label={`Özel Yazı ${i + 1}:`}
                onChange={(e) => {
                  onChange(i, CustomizableAreaType.TEXT, e.target.value);
                }}
                maxLength={maxCharacter}
                disabled={isDisabled || Boolean(value)}
              />
            </div>
          );
        });
    case "special_image":
      return Array(1)
        .fill(0)
        .map((_, i) => {
          const defaultValues = values
            .map((v) => v?.image_url as string)
            .filter(Boolean);
          return (
            <div
              className="flex items-center gap-3 whitespace-nowrap font-sans"
              key={i}
            >
              <ImageUpload
                id={`${type}_${i}`}
                defaultValues={defaultValues}
                label={`Özel Resim ${i + 1}:`}
                onChange={(files) => {
                  onChange(keyIndex, CustomizableAreaType.IMAGE, files);
                }}
                maxCharacter={count}
                disabled={isDisabled}
              />
            </div>
          );
        });
    default:
      return null;
  }
};

export default CustomizeCartItem;
