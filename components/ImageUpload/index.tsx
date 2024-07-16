"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import Button from "../Button";
import clsx from "clsx";
import Close from "../Icons/Close";

interface ImageUploadProps {
  onChange: (files: File[] | null) => void;
  id?: string;
  defaultValue?: string | null;
  label?: string;
  maxCharacter?: number;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  id,
  label,
  maxCharacter,
  disabled,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);

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

  return (
    <div className={clsx("flex items-center justify-start gap-2")}>
      <label
        className={clsx(
          "p-4 rounded-md border border-gray-300 cursor-pointer text-sm text-slate-500",
          {
            "bg-gray-200": selectedImages?.length,
          }
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          name={id}
          max={maxCharacter}
          maxLength={maxCharacter}
          id={id}
          className="hidden"
          disabled={selectedImages?.length >= maxCharacter || disabled}
        />
        <span>
          Resim Yükle ({selectedImages?.length ?? 0}/{maxCharacter})
        </span>
      </label>
      {selectedImages && (
        <div className="w-full flex gap-2 max-w-lg overflow-hidden overflow-y-auto">
          {selectedImages?.map((image, index) => (
            <div
              className="relative w-28 h-28 rounded-lg overflow-hidden"
              key={image.name}
            >
              <Image
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                width={100}
                height={100}
                alt="Resim"
                className="object-contain w-full h-full flex-1"
              />
              <Button
                type="button"
                onClick={() => {
                  const data = selectedImages?.filter((_, i) => i !== index);
                  setSelectedImages(data);
                  onChange(data);
                }}
                color="secondary"
                variant="outlined"
                className="!absolute !top-1 !right-1 !p-[2px] rounded-full"
              >
                <Close />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
