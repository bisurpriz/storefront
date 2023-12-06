import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

interface ImageUploadProps {
  onChange: (file: File) => void;
  id?: string;
  defaultValue?: string | null;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  id,
  defaultValue = null,
  label,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    () => defaultValue
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 bg-gray-100 rounded-md">
      <label
        className={`flex items-center justify-center gap-3 bg-gray-100 rounded-md cursor-pointer p-4 ${
          selectedImage ? "hidden" : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name={id}
          id={id}
          className="hidden"
        />
        <span className="text-sm font-semibold text-gray-500">Resim Yükle</span>
      </label>
      {selectedImage && (
        <div className="relative">
          <Image
            src={selectedImage}
            width={100}
            height={100}
            objectFit="contain"
            alt="Resim"
            className="rounded-md"
          />
          <Button
            type="button"
            onClick={() => setSelectedImage(null)}
            color="secondary"
            variant="outlined"
            className="!absolute !top-1 !right-1 !p-[2px] rounded-full"
          >
            <AiOutlineClose />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
