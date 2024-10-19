import { localeFormat } from "@/utils/format";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import Rating from "@/components/ReviewRating/CustomRating";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquare } from "lucide-react";

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
          className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg"
        >
          <Image
            src={getImageUrlFromPath(product.image_url[0])}
            alt={product.name}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-xs font-semibold text-gray-500">
              Değerlendirme Tarihi:{" "}
              {localeFormat(new Date(created_at), "LLLL dd, yyyy")}
            </p>
            <div className="flex items-center justify-center sm:justify-start mt-2">
              <Rating defaultValue={score} disabled />
              <span className="text-xs text-gray-500 font-bold ml-2">
                Bu ürüne {score} puan verdiniz.
              </span>
            </div>
            {comment && (
              <Alert variant="default" className="mt-4 space-x-2 text-start">
                <MessageSquare className="w-5 h-5" />
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
