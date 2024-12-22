import { cn, getImageUrlFromPath } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

const ZoomableImage = ({ image, index, isMobile }) => {
  const [show, setShow] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e) => {
    if (!show) {
      setShow(true);
      return;
    }

    if (imageRef.current && zoomRef.current && show) {
      const imageRect = imageRef.current.getBoundingClientRect();

      const offsetX = e.clientX - imageRect.left;
      const offsetY = e.clientY - imageRect.top;

      const xRatio = offsetX / imageRect.width;
      const yRatio = offsetY / imageRect.height;

      const zoomWidth = 2000;
      const zoomHeight = 2000;

      zoomRef.current.style.left = imageRect.left + imageRect.width + "px";
      zoomRef.current.style.top = imageRect.top + "px";
      zoomRef.current.style.width = imageRect.width + "px";
      zoomRef.current.style.height = imageRect.height + "px";

      const bgPosX = -xRatio * (zoomWidth - imageRect.width);
      const bgPosY = -yRatio * (zoomHeight - imageRect.height);
      zoomRef.current.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    }
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  if (isMobile) {
    return (
      <div className="relative h-full w-full flex-1">
        <Image
          ref={imageRef}
          src={getImageUrlFromPath(image, 500)}
          alt={image}
          className={cn(
            "zoom-marker h-full w-full flex-1 rounded-md object-contain",
          )}
          sizes="500px"
          width={500}
          height={500}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex-1">
      <Image
        ref={imageRef}
        src={getImageUrlFromPath(image, 500)}
        alt={image}
        className={cn(
          "zoom-marker h-full w-full flex-1 rounded-md object-contain",
        )}
        sizes="500px"
        width={500}
        height={500}
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />

      {show &&
        createPortal(
          <div
            ref={zoomRef}
            className={cn("rounded-md border border-primary bg-background")}
            style={{
              backgroundImage: `url(${getImageUrlFromPath(image, 2000)})`,
              display: "block",
              position: "fixed",
              backgroundSize: "2000px 2000px",
              backgroundRepeat: "no-repeat",
              zIndex: 999,
            }}
          />,
          document.body,
        )}
    </div>
  );
};

export default ZoomableImage;
