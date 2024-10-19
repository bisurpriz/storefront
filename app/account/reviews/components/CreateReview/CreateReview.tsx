import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import React, { FC, useState } from "react";

type CreateReviewProps = {
  selectedProduct: any;
  handleCreateReview: ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => Promise<void>;
};

const CreateReview: FC<CreateReviewProps> = ({
  selectedProduct,
  handleCreateReview,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="p-4">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl">
          {selectedProduct?.name}
        </DialogTitle>
        <DialogDescription className="text-xs sm:text-sm">
          Bu ürünü değerlendirin ve deneyiminizi paylaşın.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Ürün hakkında düşüncelerinizi yazın..."
          className="min-h-[100px]"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <Button
        onClick={() => {
          handleCreateReview({
            comment: review,
            product_id: selectedProduct.id,
            score: rating,
          });
        }}
        disabled={false}
        className="w-full"
      >
        Değerlendirmeyi Gönder
      </Button>
    </div>
  );
};

export default CreateReview;
