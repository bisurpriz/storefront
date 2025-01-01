import Chip, { ChipColor } from "@/components/Chip";

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
        className="no-scrollbar flex w-full snap-x items-start gap-2 overflow-hidden overflow-x-auto"
        tabIndex={-1}
      >
        {promotions
          ?.filter((x) => x.show)
          .map((promotion, index) => (
            <Chip
              key={promotion?.description}
              href={`/arama?${promotion.filterKey}=true`}
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
