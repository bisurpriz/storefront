import Rating from "@/components/ReviewRating/CustomRating";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

const ReviewedCard = ({
  reviews,
}: {
  reviews: GetOrdersWithReviewsQuery["review"];
}) => {
  return (
    <div className="grid gap-4">
      {reviews.map(({ product, created_at, id, comment, score }) => (
        <div
          key={id}
          className="flex flex-col items-center space-y-3 rounded-lg border p-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Image
            src={getImageUrlFromPath(product.image_url[0])}
            alt={product.name}
            width={96}
            height={96}
            className="h-24 w-24 rounded object-cover"
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-xs font-semibold text-gray-500">
              Değerlendirme Tarihi:{" "}
              {localeFormat(new Date(created_at), "LLLL dd, yyyy")}
            </p>
            <div className="mt-2 flex items-center justify-center sm:justify-start">
              <Rating defaultValue={score} disabled />
              <span className="ml-2 text-xs font-bold text-gray-500">
                Bu ürüne {score} puan verdiniz.
              </span>
            </div>
            {comment && (
              <Alert variant="default" className="mt-4 space-x-2 text-start">
                <MessageSquare className="h-5 w-5" />
                <AlertTitle>Ürün hakkında yorumunuz:</AlertTitle>
                <AlertDescription>"{comment}"</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewedCard;
