import ArrowLeft from "@/components/Icons/ArrowLeft";
import { useCallback, useEffect, useState } from "react";

const useScrollHorizontal = (
  scrollRef: React.RefObject<HTMLDivElement>,
  autoPlay = false
) => {
  const [showState, setShowState] = useState({
    showLeft: false,
    showRight: false,
    showComponent: false,
  });

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [scrollRef]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [scrollRef]);

  useEffect(() => {
    if (autoPlay && scrollRef.current) {
      const isScrollable =
        scrollRef.current?.scrollWidth > scrollRef.current?.clientWidth;

      if (!isScrollable) return;

      let interval = setInterval(() => {
        const isEnd =
          scrollRef.current?.scrollLeft + scrollRef.current?.clientWidth ===
          scrollRef.current?.scrollWidth;

        if (isEnd) {
          scrollLeft();
          return;
        }

        scrollRight();
      }, 3000);

      if (scrollRef.current) {
        scrollRef.current.addEventListener("mouseenter", () => {
          clearInterval(interval);
        });

        scrollRef.current.addEventListener("touchstart", () => {
          clearInterval(interval);
        });

        scrollRef.current.addEventListener("mouseleave", () => {
          interval = setInterval(() => {
            const isEnd =
              scrollRef.current?.scrollLeft + scrollRef.current?.clientWidth ===
              scrollRef.current?.scrollWidth;

            if (isEnd) {
              scrollRef.current.scrollBy({
                behavior: "smooth",
                left: -scrollRef.current.scrollWidth,
              });
              return;
            }

            scrollRight();
          }, 3000);
        });

        scrollRef.current.addEventListener("touchend", () => {
          interval = setInterval(() => {
            const isEnd =
              scrollRef.current?.scrollLeft + scrollRef.current?.clientWidth ===
              scrollRef.current?.scrollWidth;

            if (isEnd) {
              scrollRef.current.scrollBy({
                behavior: "smooth",
                left: -scrollRef.current.scrollWidth,
              });
              return;
            }

            scrollRight();
          }, 3000);
        });
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [scrollRef, autoPlay]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setShowState({
          showLeft: scrollLeft > 0,
          showRight: scrollLeft + clientWidth < scrollWidth,
          showComponent: true,
        });
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  const ScrollButtons = () =>
    showState.showComponent && (
      <div className="flex gap-2">
        {showState.showLeft ? (
          <button
            onClick={scrollLeft}
            className="p-1 bg-gray-200 rounded-sm hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 text-gray-400" />
          </button>
        ) : (
          <div className="w-5 h-5 invisible" />
        )}
        {showState.showRight ? (
          <button
            onClick={scrollRight}
            className="p-1 bg-gray-200 rounded-sm hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>
        ) : (
          <div className="w-5 h-5 invisible" />
        )}
      </div>
    );

  return { scrollLeft, scrollRight, ScrollButtons };
};

export default useScrollHorizontal;
