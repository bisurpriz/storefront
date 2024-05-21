import { debounce } from "@/utils/debounce";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

interface SlideInputProps {
  min: number;
  max: number;
  step?: number;
  onChange?: (min: number, max: number) => void;
  defaultValues?: {
    min: number;
    max: number;
  };
}

const SlideInput: FC<SlideInputProps> = ({
  min,
  max,
  step,
  onChange,
  defaultValues,
}) => {
  const [minVal, setMinVal] = useState(defaultValues?.min || min);
  const [maxVal, setMaxVal] = useState(defaultValues?.max || max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  const debouncedOnChange = useRef(
    debounce((min: number, max: number) => {
      onChange?.(min, max);
    }, 300)
  ).current;

  const getPercent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const tooltipContent = useMemo(() => {
    return `${minVal}₺ - ${maxVal}₺`;
  }, [minVal, maxVal]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={step}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            debouncedOnChange(value, maxVal);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          step={step}
          max={max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            debouncedOnChange(minVal, value);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default SlideInput;
