"use client";

import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createReview } from "../../actions";

import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import { useEffect } from "react";
import CreateReview from "../CreateReview/CreateReview";

const NotReviewedCard = ({
  orders,
}: {
  orders: GetOrdersWithReviewsQuery["order_item"];
}) => {
  const { openDialog, closeDialog } = useResponsiveDialog();

  const { refresh } = useRouter();

  const handleCreateReview = async ({
    product_id,
    score,
    comment,
  }: {
    product_id: number;
    score: number;
    comment: string;
  }) => {
    try {
      const response = await createReview({
        product_id,
        score,
        comment,
      });

      if (!response) {
        throw new Error("Review creation failed");
      }

      toast.success("Değerlendirme başarıyla eklendi.");
      closeDialog();
      refresh();
    } catch (error) {
      toast.error("Değerlendirme eklenirken bir hata oluştu.");
      console.error("Review creation error:", error);
    }
  };

  useEffect(() => {
    return () => {
      closeDialog();
    };
  }, []);

  return (
    <div className="grid gap-4">
      {orders.map(({ id, product, created_at, order_tenant }) => (
        <div
          key={id}
          className="flex flex-col space-y-3 rounded-lg border p-4 max-sm:items-center sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Image
            src={getImageUrlFromPath(product.image_url[0])}
            alt={product.name}
            className="h-24 w-24 rounded object-cover"
            width={96}
            height={96}
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-xs font-semibold text-gray-500">
              Sipariş Tarihi:{" "}
              {localeFormat(new Date(created_at), "LLLL dd, yyyy")}
            </p>
            <div className="mt-2 flex items-center justify-center sm:justify-start">
              <StatusBadge
                status={OrderItemStatus[order_tenant.order_status.value]}
              />
            </div>
          </div>

          <Button
            onClick={() =>
              openDialog(
                <CreateReview
                  selectedProduct={product}
                  handleCreateReview={handleCreateReview}
                />,
              )
            }
            className="w-full self-center sm:w-auto"
          >
            Değerlendir
          </Button>
        </div>
      ))}
    </div>
  );
};

export default NotReviewedCard;
