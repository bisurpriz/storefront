import { Button } from "@/components/ui/button";
import { differenceInDays, parseISO } from "date-fns";

interface CouponCardProps {
  title: string;
  description?: string;
  endDate?: string;
  minimumAmount?: number;
  discountAmount?: number;
}

const CouponCard = ({
  title,
  description,
  endDate,
  minimumAmount,
  discountAmount,
}: CouponCardProps) => {
  const today = new Date();

  const daysDifference = differenceInDays(parseISO(endDate), today);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 whitespace-nowrap rounded-md text-sm capitalize">
          {title}
        </span>
        <span className="whitespace-nowrap rounded-md bg-orange-100 p-2 text-xs leading-none text-orange-500">
          ⚠️ Son {daysDifference + " "}
          gün
        </span>
      </div>
      <div className="mt-2 flex items-center">
        {description && (
          <p className="w-1/2 whitespace-pre-line text-xs text-gray-500">
            {description}
          </p>
        )}
        <div className="mx-2 h-14 border-r border-gray-300" />
        <div className="flex w-1/2">
          <div className="my-auto flex h-full w-full items-center justify-between">
            <h4 className="text-xl font-semibold text-orange-500">
              {discountAmount} TL
            </h4>
            <Button size="sm" variant="outline">
              Kullan
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-2 flex justify-between">
        <span className="text-[0.55rem] text-gray-500">
          Min. Alışveriş Tutarı: {minimumAmount} TL
        </span>

        <span className="text-[0.55rem] text-gray-500">
          Skt: {new Date(endDate).toLocaleDateString("tr-TR")}
        </span>
      </div>
    </div>
  );
};

export default CouponCard;
