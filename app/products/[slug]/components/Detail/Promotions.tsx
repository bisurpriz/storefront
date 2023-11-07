import React from "react";

type Promotions = {
  icon: string | React.ReactElement;
  description: string;
};

const Promotions = ({ promotions }: { promotions: Promotions[] }) => {
  return (
    promotions?.length > 0 && (
      <div className="mb-2 p-3 gap-2 bg-sky-100 text-sky-600 rounded-lg">
        {promotions?.map((promotion, index) => (
          <div
            key={promotion?.description}
            className="flex items-start justify-start gap-2"
          >
            <span aria-label="Kampanya ikonu" className="text-xl">
              {promotion.icon}
            </span>
            <p
              aria-label="Kampanya açıklaması"
              className={`${
                index === promotions.length - 1 ? "mb-0" : "mb-2"
              } text-sm`}
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
