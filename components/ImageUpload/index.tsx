"use client";

import Image from "next/image";
import { useState, ChangeEvent, useEffect, useRef, FC } from "react";
import clsx from "clsx";
import Close from "../Icons/Close";
import { Button } from "../ui/button";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface ImageUploadProps {
  onChange: (files: File[] | null) => void;
  id?: string;
  defaultValues?: string[] | null;
  label?: string;
  maxCharacter?: number;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  onChange,
  id,
  label,
  maxCharacter,
  disabled,
  defaultValues,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0 && !selectedImages) {
      const files = defaultValues.map((item) => {
        return item as unknown as File;
      });
      setSelectedImages(files);
      onChange(files);
    }
  }, [defaultValues]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files.length === 0) return;

    let fileItems = [] as File[];
    for (let index = 0; index < files.length; index++) {
      const element = files.item(index);
      fileItems.push(element);
    }

    if (fileItems.length > maxCharacter) {
      fileItems.splice(maxCharacter, files.length - maxCharacter);
    }

    setSelectedImages(fileItems);
    onChange(fileItems);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx("flex items-center justify-start gap-2")}>
      <label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          name={id}
          max={maxCharacter}
          maxLength={maxCharacter}
          className="hidden"
          disabled={selectedImages?.length >= maxCharacter || disabled}
          ref={inputRef}
        />
        <Button
          type="button"
          variant="outline"
          disabled={selectedImages?.length >= maxCharacter || disabled}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.click();
          }}
        >
          Resim Yükle ({selectedImages?.length ?? 0}/{maxCharacter})
        </Button>
      </label>
      {selectedImages && (
        <div className="w-full flex gap-2 max-w-lg overflow-hidden overflow-y-auto">
          {selectedImages?.map((image, index) => {
            return (
              <div
                className="relative w-24 h-24 rounded-lg overflow-hidden"
                key={image.name}
              >
                <Image
                  src={
                    typeof image === "string"
                      ? getImageUrlFromPath(image)
                      : URL.createObjectURL(image)
                  }
                  width={70}
                  height={70}
                  quality={70}
                  alt="Resim"
                  className="object-contain w-full h-full flex-1"
                />
                {!(defaultValues.length === maxCharacter) && (
                  <Button
                    type="button"
                    onClick={() => {
                      const data = selectedImages?.filter(
                        (_, i) => i !== index
                      );
                      setSelectedImages(data);
                      onChange(data);
                    }}
                    variant="outline"
                    className="!absolute !top-1 !right-1 !p-[2px] rounded-full h-auto"
                  >
                    <Close />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
