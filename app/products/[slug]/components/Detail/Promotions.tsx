type Promotions = {
  icon: string | React.ReactElement;
  description: string;
};

const Promotions = ({ promotions }: { promotions: Promotions[] }) => {
  return (
    promotions?.length > 0 && (
      <div className="gap-2 flex items-start mb-2">
        {promotions?.map((promotion, index) => (
          <div
            key={promotion?.description}
            className="flex items-start justify-start rounded-lg p-2  gap-1 bg-sky-50  border border-sky-600 text-sky-600 "
          >
            <span aria-label="Kampanya ikonu" className="text-lg">
              {promotion.icon}
            </span>
            <p
              aria-label="Kampanya açıklaması"
              className={`text-xs tracking-wide`}
            >
              {promotion.description}
            </p>
          </div>
        ))}
      </div>
    )
  );
};

export default Promotions;
