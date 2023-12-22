import Rating from "@/components/Rating/Rating";
import { localeFormat } from "@/utils/format";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Button from "@/components/Button";

interface Props {
  imageUrl: string;
  productName: string;
  reviewDate: string;
  rating: number;
  reviewCount: number;
  productId: number;
  comment: string;
}

const ReviewedCard = ({
  imageUrl,
  productName,
  reviewDate,
  rating,
  reviewCount,
  comment,
}: Props) => {
  return (
    <div className="flex items-center gap-4 border p-4 shadow-md rounded-md max-sm:flex-col max-sm:items-center max-sm:w-full">
      <Image
        src={getImageUrlFromPath(imageUrl)}
        alt="product"
        width={200}
        height={200}
        className="rounded-md object-cover w-32 h-32 shadow-md"
      />
      <div className="flex flex-col items-start justify-end font-mono">
        <h4 className="text-lg font-semibold text-slate-700 max-w-xs m-0">
          {productName}
        </h4>
        <p className="text-xs m-0 leading-none text-slate-500 max-w-lg mt-0 whitespace-nowrap mb-2">
          Değerlendirme tarihi: {localeFormat(new Date(reviewDate), "PPP")}
        </p>
        <div className="flex gap-2 items-end mb-2 text-xs text-slate-400">
          <Rating value={rating ?? 3} readOnly showReviewCount={false} />
          {reviewCount}
        </div>

        <p className="text-xs m-0 leading-none text-slate-500 max-w-lg mt-0 whitespace-nowrap mb-2">
          {comment}
        </p>

        <Button label="Sil" variant="outlined" color="secondary" size="small" />
      </div>
    </div>
  );
};

export default ReviewedCard;
