import Link from "next/link";

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

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 32 32"
    className="w-6 h-6"
  >
    <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
  </svg>
);

const RatingDetail = ({ rateCounts, rating, totalRating }: RatingProps) => {
  const percentage = (val: number) => {
    const per = (val / totalRating) * 100;

    return per;
  };

  const getLimitedValue = (val: number) => {
    if (val > 999) {
      return `${(val / 1000).toFixed(1)}K+`;
    }

    return val;
  };

  return rateCounts ? (
    <div className="flex flex-col gap-2 items-start justify-center">
      <p className="whitespace-nowrap mx-10">5 üzerinden {rating} yıldız</p>
      {Object.entries(rateCounts).map(([key, value]) => (
        <div key={key} className="flex items-center justify-start gap-2">
          <p
            aria-label={`${key} yıldızlı ${value} değerlendirme`}
            className="text-orange-500"
          >
            <Star />
          </p>
          <p aria-label={`${key} yıldızlı ${value} değerlendirme`}>{key}</p>
          <div
            className="w-[100px] h-1.5 bg-gray-200 rounded-xl"
            style={{
              background: `linear-gradient(90deg, #f97316 ${percentage(
                value as any
              )}%, #F1F5F9 ${percentage(value as any)}%)`,
            }}
          />
          <p
            aria-label={`${key} yıldızlı ${value} değerlendirme`}
            className="text-gray-500 ml-2"
          >
            {getLimitedValue(value as any)}
          </p>
        </div>
      ))}
      <Link
        href={`#reviews`}
        className="text-primary font-normal hover:underline mx-auto"
      >
        Tüm değerlendirmeleri gör
      </Link>
    </div>
  ) : null;
};

export default RatingDetail;
