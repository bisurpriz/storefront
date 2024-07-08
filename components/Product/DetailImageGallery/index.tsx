"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import ZoomableImage from "./ZoomableImage";

type ProductDetailImageGalleryProps = {
  images: {
    id: number;
    url: string;
  }[];
};

const ProductDetailImageGallery: React.FC<ProductDetailImageGalleryProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full flex items-start justify-center gap-2 max-h-[500px]">
      <div className="flex flex-col gap-2 items-center justify-start max-h-[500px] h-full overflow-y-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-lg cursor-pointer w-28 h-w-28"
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt="Product Image"
              className="object-cover h-auto w-auto"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
      <div
        className={clsx(
          "flex items-start justify-center relative",
          "h-[500px] w-full object-contain border border-gray-200 rounded-lg"
        )}
      >
        <ZoomableImage
          src={selectedImage.url}
          alt="Product Image"
          width={1200}
          height={1200}
          resultWidth={400}
          resultHeight={400}
        />
      </div>
    </div>
  );
};

export default ProductDetailImageGallery;
