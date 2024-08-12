import { FC, useEffect, useRef, useState } from "react";
import { motion, PanInfo } from "framer-motion";

interface SliderProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  gap?: number;
}

const Slider: FC<SliderProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  imageWidth = 200,
  imageHeight = 200,
  gap = 16,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImagesCount, setVisibleImagesCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      // Calculate visibleImagesCount based on the width of the container
      const containerWidth = ref.current.clientWidth;
      const count = Math.floor(containerWidth / (imageWidth + gap));
      setVisibleImagesCount(count);
    }
  }, [ref, imageWidth, gap]);

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - visibleImagesCount ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - visibleImagesCount : prevIndex - 1
    );
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden" ref={ref}>
      <motion.div
        className="flex items-center gap-4"
        drag="x"
        dragConstraints={{
          left: -currentIndex * (imageWidth + gap),
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        onDragStart={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }}
        initial={{ x: 0 }}
        animate={{ x: -currentIndex * (imageWidth + gap) }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {images
          .concat(images.slice(0, visibleImagesCount))
          .map((image, index) => (
            <div
              key={index}
              style={{
                width: imageWidth,
                height: imageHeight,
                flex: "0 0 auto",
              }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="object-cover rounded-lg w-full h-full"
                style={{ pointerEvents: "none" }} // Disable pointer events on the image
              />
            </div>
          ))}
      </motion.div>
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
