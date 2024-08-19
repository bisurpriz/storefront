import { useRef, useEffect } from "react";

interface UseImageZoomProps {
  resultWidth: number;
  resultHeight: number;
  zoomLevel: number;
  src: string;
}

const useImageZoom = ({
  resultWidth,
  resultHeight,
  zoomLevel,
  src,
}: UseImageZoomProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const lens = lensRef.current;
    const result = resultRef.current;

    if (!img || !lens || !result) return;

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = `${img.width * cx * zoomLevel}px ${
      img.height * cy * zoomLevel
    }px`;

    const moveLens = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight)
        y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      result.style.backgroundPosition = `-${x * cx * zoomLevel}px -${
        y * cy * zoomLevel
      }px`;
    };

    const getCursorPos = (e: MouseEvent | TouchEvent) => {
      const a = img.getBoundingClientRect();
      let x = 0;
      let y = 0;

      if (e instanceof MouseEvent) {
        x = e.pageX - a.left;
        y = e.pageY - a.top;
      } else {
        x = e.touches[0].pageX - a.left;
        y = e.touches[0].pageY - a.top;
      }

      x = x - window.scrollX;
      y = y - window.scrollY;
      return { x, y };
    };

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    return () => {
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchmove", moveLens);
    };
  }, [resultWidth, resultHeight, zoomLevel, src]);

  return { imgRef, lensRef, resultRef };
};

export default useImageZoom;
