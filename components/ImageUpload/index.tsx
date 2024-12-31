"use client";

import { getImageUrlFromPath } from "@/utils/getImageUrl";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

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
    if (defaultValues && defaultValues?.length > 0 && !selectedImages) {
      const files = defaultValues?.map((item) => {
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
        <div className="flex w-full max-w-lg gap-2 overflow-hidden overflow-y-auto">
          {selectedImages?.map((image, index) => {
            return (
              <div
                className="relative h-24 w-24 overflow-hidden rounded-lg"
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
                  className="h-full w-full flex-1 object-contain"
                />
                {!(defaultValues?.length === maxCharacter) && (
                  <Button
                    type="button"
                    onClick={() => {
                      const data = selectedImages?.filter(
                        (_, i) => i !== index,
                      );
                      setSelectedImages(data);
                      onChange(data);
                    }}
                    variant="outline"
                    className="!absolute !right-1 !top-1 h-auto rounded-full !p-[2px]"
                  >
                    <X />
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
