import Link from "next/link";

type Promotions = {
  icon: string | React.ReactElement;
  description: string;
  filterKey: string;
  show?: boolean;
};

const Promotions = ({ promotions }: { promotions: Promotions[] }) => {
  return (
    promotions?.length > 0 && (
      <div
        className="gap-2 flex items-start mb-2 overflow-hidden overflow-x-auto w-full snap-x no-scrollbar"
        tabIndex={-1}
      >
        {promotions
          ?.filter((x) => x.show)
          .map((promotion, index) => (
            <Link
              key={promotion?.description}
              className="flex items-start justify-start rounded-lg p-1 gap-1 bg-sky-50  border border-sky-600 text-sky-600"
              href={`/products?filter=${promotion.filterKey}`}
              tabIndex={-1}
            >
              <span aria-label="Kampanya ikonu" className="text-lg">
                {promotion.icon}
              </span>
              <p
                aria-label="Kampanya açıklaması"
                className={`text-xs tracking-wide whitespace-nowrap`}
              >
                {promotion.description}
              </p>
            </Link>
          ))}
      </div>
    )
  );
};

export default Promotions;

Promotions.defaultProps = {
  show: true,
};
