import Chip, { ChipColor } from "@/components/Chip";
import { Link } from "@/components/Link";

type Promotions = {
  icon: string | React.ReactElement;
  description: string;
  filterKey: string;
  show?: boolean;
  color?: keyof typeof ChipColor;
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
            <Chip
              key={promotion?.description}
              href={`/?search=&${promotion.filterKey}=true`}
              label={promotion.description}
              as="link"
              color={promotion.color}
              icon={promotion.icon}
              size="small"
              rounded="semi"
              variant="soft"
            />
          ))}
      </div>
    )
  );
};

export default Promotions;

Promotions.defaultProps = {
  show: true,
};
