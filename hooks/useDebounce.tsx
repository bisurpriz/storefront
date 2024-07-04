import { useRef, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const timer = useRef(null);

  const debouncedFunction = (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
