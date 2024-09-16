import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import Image from "next/image";
interface Slide {
  id: number;
  imageUrl: string;
  label: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayTime?: number;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoPlay = false,
  autoPlayTime = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [willAutoPlay, setWillAutoPlay] = useState(autoPlay);

  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;
  const slideWidth = 130;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (willAutoPlay) {
      slideInterval.current = setInterval(nextSlide, autoPlayTime);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [willAutoPlay, autoPlayTime, willAutoPlay]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newSlidesToShow = Math.floor(screenWidth / slideWidth);
      setSlidesToShow(newSlidesToShow);
      if (newSlidesToShow < slidesToShow) {
        setCurrentIndex(0);
      }

      if (totalSlides <= newSlidesToShow) {
        setWillAutoPlay(false);
        setCurrentIndex(0);
      } else {
        setWillAutoPlay(autoPlay);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getTransformStyle = () => {
    if (totalSlides <= slidesToShow && !willAutoPlay) {
      return { transform: `translateX(0)` };
    }

    return { transform: `translateX(-${currentIndex * slideWidth}px)` };
  };

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-content" style={getTransformStyle()}>
        {slides.map((slide, index) => (
          <div
            className="slide"
            key={slide.id}
            style={{ width: `${slideWidth}px` }}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.label}
              width={130}
              height={130}
            />
            <p className="text-sm font-semibold font-manrope text-center mt-1">
              {slide.label}
            </p>
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
