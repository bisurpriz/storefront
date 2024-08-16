import useImageZoom from "@/hooks/useImageZoom";
import Image from "next/image";
import { FC, useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  resultWidth: number;
  resultHeight: number;
}

const ZoomableImage: FC<ZoomableImageProps> = ({
  src,
  alt,
  width,
  height,
  resultWidth,
  resultHeight,
}) => {
  const { imgRef, lensRef, resultRef } = useImageZoom({
    resultWidth,
    resultHeight,
    zoomLevel: 1,
    src,
  });

  return (
    <>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-contain"
        priority
      />
      <>
        <div
          ref={lensRef}
          className="absolute border border-gray-400 w-10 h-10"
        />
        <div
          ref={resultRef}
          className="border border-gray-400 absolute left-full top-1/2 -translate-y-1/2 w-80 h-80 bg-no-repeat bg-cover z-10"
        />
      </>
    </>
  );
};

export default ZoomableImage;
