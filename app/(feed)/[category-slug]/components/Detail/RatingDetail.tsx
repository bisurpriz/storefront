import { CustomStar } from "@/components/ReviewRating/CustomStar";
import { Link } from "@/components/Link";
import { motion } from "framer-motion";

export type RatingProps = {
  rating: number;
  rateCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  totalRating: number;
};

const RatingDetail = ({ rateCounts, rating, totalRating }: RatingProps) => {
  const percentage = (val: number) => {
    return (val / totalRating) * 100;
  };

  const getLimitedValue = (val: number) => {
    if (val > 999) {
      return `${(val / 1000).toFixed(1)}K+`;
    }

    return val;
  };

  return rateCounts ? (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold max-sm:text-sm">
          {rating.toFixed(1)} Puan
        </p>
        <Link
          href="#yorumlar"
          className="text-sm font-semibold text-primary max-sm:text-xs"
        >
          ({totalRating} Yorum)
        </Link>
      </div>
      {Object.keys(rateCounts).map((key) => {
        return (
          <div
            key={key}
            className={
              "grid grid-cols-12 items-center justify-start text-xs font-semibold"
            }
          >
            <p className="col-span-4 flex items-center justify-start gap-1 text-gray-700">
              {key}
              {Array.from({ length: parseInt(key) }).map((_, index) => (
                <span key={index}>
                  <CustomStar className="h-4 w-4 fill-yellow-400 stroke-yellow-400 max-sm:h-3 max-sm:w-3" />
                </span>
              ))}
            </p>
            <div className="col-span-8 flex items-center justify-start gap-4">
              <div className={`relative h-1.5 w-52 rounded-lg bg-gray-200`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage(rateCounts[key])}%` }}
                  transition={{ duration: 1 }}
                  className={`absolute left-0 top-0 h-full rounded-lg bg-yellow-400`}
                />
              </div>
              <p>{getLimitedValue(rateCounts[key])}</p>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default RatingDetail;
