"use client";

import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { CustomizableArea } from "@/common/types/Order/order";
import { CustomizableAreaType } from "@/common/enums/Order/product";

interface Area extends Partial<CustomizableArea> {
  count: number;
  maxCharacter: number;
  keyIndex: number;
}

interface CustomizeCartItemProps extends Area {
  onChange: (inputIndex, type, value) => void;
}

const CustomizeCartItem = ({
  type,
  count,
  values,
  onChange,
  maxCharacter,
  keyIndex,
}: CustomizeCartItemProps) => {
  let timeout: NodeJS.Timeout;
  const debouncedTextChange = (i, type, value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(i, type, value);
    }, 500);
  };

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
              defaultValue={values?.[`${keyIndex}_${type}_${i}`] as string}
              label={`Özel Yazı ${i + 1}:`}
              onChange={(e) => {
                debouncedTextChange(
                  i,
                  CustomizableAreaType.TEXT,
                  e.target.value
                );
              }}
              maxLength={maxCharacter}
            />
          </div>
        ));
    case "special_image":
      return Array(count)
        .fill(0)
        .map((_, i) => {
          const value = values?.[`${keyIndex}_${type}_${i}`]?.[0];
          return (
            <div
              className="flex items-center gap-3 whitespace-nowrap font-sans"
              key={i}
            >
              <ImageUpload
                id={`${type}_${i}`}
                defaultValue={value}
                label={`Özel Resim ${i + 1}:`}
                onChange={(files) => {
                  onChange(i, CustomizableAreaType.IMAGE, files);
                }}
                count={count}
              />
            </div>
          );
        });
    default:
      return null;
  }
};

export default CustomizeCartItem;
