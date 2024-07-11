"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import ZoomButton from "./ZoomButton";
import { useImageZoomModal } from "@/contexts/ImageZoomModalContext";

type ProductDetailImageGalleryProps = {
  images: string[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const { open } = useImageZoomModal();

  return (
    <div className="w-full flex items-start justify-center gap-2 lg:max-h-[500px]  max-lg:flex-col-reverse">
      <div className="flex flex-col gap-2  max-lg:flex-row items-center justify-start max-h-[500px] h-full overflow-y-auto ">
        {images?.map((image) => (
          <div
            key={image}
            className={clsx(
              "flex items-center justify-center relative overflow-hidden",
              "h-20 w-20 object-contain border border-gray-200 rounded-lg flex-1 aspect-square"
            )}
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => handleImageClick(image)}
          >
            <Image
              src={`${image}?width=100&height=100&format=wepb&quality=75`}
              alt="Product Image"
              className="h-full w-full object-cover"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <div
        className={clsx(
          "flex flex-1 items-start justify-center overflow-hidden relative",
          "h-[500px] w-full object-contain border border-gray-200 rounded-lg aspect-square bg-slate-500"
        )}
      >
        {/* <ZoomableImage
          src={selectedImage.url}
          alt="Product Image"
          width={1200}
          height={1200}
          resultWidth={400}
          resultHeight={400}
        /> */}
        <Image
          src={selectedImage}
          alt="Product Image"
          className="h-full w-full object-contain"
          width={500}
          height={500}
        />
        <ZoomButton
          onClick={() => {
            open(selectedImage);
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;
