import Button from "@/components/Button";
import Card from "@/components/Card";
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
    <Card wrapperClass="border !border-gray-300">
      <div className="flex items-center justify-between">
        <span className="text-sm rounded-md flex gap-1 whitespace-nowrap items-center capitalize">
          {title}
        </span>
        <span className="text-xs text-orange-500 p-2 bg-orange-100 rounded-md leading-none whitespace-nowrap">
          ⚠️ Son {daysDifference + " "}
          gün
        </span>
      </div>
      <div className="flex items-center mt-2">
        {description && (
          <p className="text-xs text-gray-500 w-1/2 whitespace-pre-line">
            {description}
          </p>
        )}
        <div className="border-r border-gray-300 h-14 mx-2" />
        <div className="w-1/2 flex">
          <div className="w-full h-full flex items-center justify-between my-auto">
            <h4 className="text-xl font-semibold text-orange-500">
              {discountAmount} TL
            </h4>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              className="text-xs"
            >
              Kullan
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-gray-500 text-[0.55rem]">
          Min. Alışveriş Tutarı: {minimumAmount} TL
        </span>

        <span className="text-[0.55rem] text-gray-500">
          Skt: {new Date(endDate).toLocaleDateString("tr-TR")}
        </span>
      </div>
    </Card>
  );
};

export default CouponCard;
