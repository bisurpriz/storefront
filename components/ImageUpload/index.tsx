"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import clsx from "clsx";

interface ImageUploadProps {
  onChange: (files: string[] | null) => void;
  id?: string;
  defaultValue?: string | null;
  label?: string;
  count?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  id,
  defaultValue = null,
  label,
  count,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(
    defaultValue ? [defaultValue] : null
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files.length === 0) return;

    const images = Array.from(files).map((file) => URL.createObjectURL(file));

    setSelectedImages(selectedImages ? [...selectedImages, ...images] : images);
    onChange(selectedImages ? [...selectedImages, ...images] : images);
  };

  return (
    <div
      className={clsx("flex items-center justify-center gap-3 rounded-md", {
        "flex-row-reverse": selectedImages?.length,
      })}
    >
      <label className="mt-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          name={id}
          id={id}
          className="hidden"
          disabled={selectedImages?.length >= count}
        />
        <span
          className={clsx(
            "text-white rounded-md p-2 cursor-pointer",
            selectedImages?.length >= count ? "bg-gray-400" : "bg-green-500"
          )}
        >
          Resim Yükle ({selectedImages?.length ?? 0}/{count})
        </span>
      </label>
      {selectedImages && (
        <div className="w-full flex gap-2 overflow-hidden">
          {selectedImages?.map((image, index) => (
            <div className="relative" key={image}>
              <span>
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt="Resim"
                  className="rounded-md object-contain w-28 h-28"
                />
              </span>
              <Button
                type="button"
                onClick={() => {
                  setSelectedImages((prev) => {
                    const newImages = [...prev];
                    newImages.splice(index, 1);
                    return newImages;
                  });
                }}
                color="secondary"
                variant="outlined"
                className="!absolute !top-1 !right-1 !p-[2px] rounded-full"
              >
                <AiOutlineClose />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
