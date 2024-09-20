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
    <div className="bg-white p-4 rounded-lg flex flex-col gap-4 shadow-md ring ring-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">{rating.toFixed(1)} Puan</p>
        <Link
          href="/#yorumlar"
          className="text-primary-500 text-sm font-semibold"
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
            <p className="text-gray-800 col-span-4 flex items-center justify-start gap-1">
              {key}
              {Array.from({ length: parseInt(key) }).map((_, index) => (
                <span key={index}>
                  <CustomStar className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                </span>
              ))}
            </p>
            <div className="flex items-center justify-start col-span-8 gap-4">
              <div className={`w-52 h-1.5 bg-gray-200 rounded-lg relative`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage(rateCounts[key])}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full bg-yellow-400 rounded-lg absolute left-0 top-0`}
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
