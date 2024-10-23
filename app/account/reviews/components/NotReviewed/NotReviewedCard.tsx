"use client";

import { localeFormat } from "@/utils/format";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { createReview } from "../../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useResponsiveDialog } from "@/contexts/DialogContext/ResponsiveDialogContext";
import CreateReview from "../CreateReview/CreateReview";
import { OrderItemStatus } from "@/common/enums/Order/product";
import StatusBadge from "@/components/StatusBadge";

const NotReviewedCard = ({
  orders,
}: {
  orders: GetOrdersWithReviewsQuery["order_item"];
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
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
    const response = await createReview({
      product_id,
      score,
      comment,
    });
    if (response?.created_at) {
      closeDialog();
      toast.success("Değerlendirme başarıyla eklendi.");
    }
    refresh();
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
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 max-sm:items-center sm:space-x-4 p-4 border rounded-lg"
        >
          <Image
            src={getImageUrlFromPath(product.image_url[0])}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
            width={96}
            height={96}
          />
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-xs font-semibold text-gray-500">
              Sipariş Tarihi:{" "}
              {localeFormat(new Date(created_at), "LLLL dd, yyyy")}
            </p>
            <div className="flex items-center justify-center sm:justify-start mt-2">
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
                />
              )
            }
            className="w-full sm:w-auto self-center"
          >
            Değerlendir
          </Button>
        </div>
      ))}
    </div>
  );
};

export default NotReviewedCard;
