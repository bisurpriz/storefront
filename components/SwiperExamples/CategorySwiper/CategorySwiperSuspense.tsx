import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

const CategorySwiperSuspense = () => {
  return (
    <div className={clsx("h-[150px] w-full overflow-hidden whitespace-nowrap")}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="mr-[10px] inline-block last:mr-0">
          <Skeleton className={clsx("h-[130px] w-[130px] rounded-full")} />
          <Skeleton
            className={clsx("block h-4 rounded-lg", "mt-1", "w-full")}
          />
        </div>
      ))}
    </div>
  );
};

export default CategorySwiperSuspense;
