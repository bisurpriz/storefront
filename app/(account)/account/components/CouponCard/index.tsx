import { Link } from "@/components/Link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GetAllCouponsQuery } from "@/graphql/queries/account/coupon.generated";
import { getTenantUrl } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { differenceInDays, parseISO } from "date-fns";
import {
  CalendarIcon,
  InfoIcon,
  ShoppingCartIcon,
  TagIcon,
} from "lucide-react";

interface CouponCardProps {
  title: string;
  description?: string;
  endDate?: string;
  minimumAmount?: number;
  discountAmount?: number;
  couponCode?: string;
  limit?: number;
  leftLimit?: number;
  tenant: GetAllCouponsQuery["coupon"][number]["tenant"]["tenants"][number];
}

const CouponCard = ({
  title,
  description,
  endDate,
  minimumAmount,
  discountAmount,
  couponCode,
  limit,
  leftLimit = 0,
  tenant,
}: CouponCardProps) => {
  const today = new Date();
  const daysDifference = endDate
    ? differenceInDays(parseISO(endDate), today)
    : 0;

  const isExpired = daysDifference < 0;
  const usagePercentage = ((limit - leftLimit) / limit) * 100;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <Badge
            variant={isExpired ? "discount" : "soldOut"}
            className="text-xs sm:text-sm"
          >
            {isExpired ? "Süresi doldu" : `Kalan: ${daysDifference} gün`}
          </Badge>
          {description && (
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <CardTitle className="mt-2 text-base sm:text-lg">{title}</CardTitle>
        {couponCode && (
          <CardDescription className="mt-1 text-xs sm:text-sm">
            Kod: <span className="font-bold">{couponCode}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between p-3 sm:p-4">
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground sm:text-sm">
            <CalendarIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
            <span>
              Son Kullanma:{" "}
              {endDate
                ? localeFormat(new Date(endDate), "dd MMMM yyyy")
                : "Belirtilmemiş"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TagIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="text-xs font-semibold sm:text-sm">
                {discountAmount} TL indirim
              </span>
            </div>
            <div className="flex items-center">
              <ShoppingCartIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="text-xs font-semibold sm:text-sm">
                Min. {minimumAmount} TL
              </span>
            </div>
          </div>
        </div>
        {limit && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs sm:text-sm">
              <span>Kullanım</span>
              <span>
                {limit - leftLimit} / {limit}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
        )}
        <Link href={getTenantUrl(tenant.name, tenant.id.toString())}>
          <Button
            className="mt-4 w-full"
            variant={isExpired ? "outline" : "default"}
            disabled={isExpired}
          >
            {isExpired ? "Süresi Doldu" : "Ürünleri Gör"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CouponCard;
