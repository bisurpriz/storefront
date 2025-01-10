import { useCallback, useEffect, useRef } from "react";

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

  const getCursorPos = useCallback((e: MouseEvent | TouchEvent) => {
    const img = imgRef.current;
    if (!img) return { x: 0, y: 0 };

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
  }, []);

  const moveLens = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const img = imgRef.current;
      const lens = lensRef.current;
      const result = resultRef.current;

      if (!img || !lens || !result) return;

      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      const maxX = img.width - lens.offsetWidth;
      const maxY = img.height - lens.offsetHeight;

      x = Math.min(Math.max(x, 0), maxX);
      y = Math.min(Math.max(y, 0), maxY);

      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;

      requestAnimationFrame(() => {
        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;
        result.style.backgroundPosition = `-${x * cx * zoomLevel}px -${y * cy * zoomLevel}px`;
      });
    },
    [getCursorPos, zoomLevel],
  );

  useEffect(() => {
    const img = imgRef.current;
    const lens = lensRef.current;
    const result = resultRef.current;

    if (!img || !lens || !result) return;

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${src}')`;
    result.style.backgroundSize = `${img.width * cx * zoomLevel}px ${img.height * cy * zoomLevel}px`;

    const cleanup = () => {
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchmove", moveLens);
    };

    cleanup();

    lens.addEventListener("mousemove", moveLens, { passive: false });
    img.addEventListener("mousemove", moveLens, { passive: false });
    lens.addEventListener("touchmove", moveLens, { passive: false });
    img.addEventListener("touchmove", moveLens, { passive: false });

    return cleanup;
  }, [moveLens, src, zoomLevel]);

  return { imgRef, lensRef, resultRef };
};

export default useImageZoom;
