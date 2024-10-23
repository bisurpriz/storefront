"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import Image from "next/image";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import Rating from "@/components/ReviewRating/CustomRating";
import ReviewedCard from "../Reviewed/ReviewedCard";
import NotReviewedCard from "../NotReviewed/NotReviewedCard";

interface ProductReviewsTabProps {
  reviews: GetOrdersWithReviewsQuery["review"];
  orders: GetOrdersWithReviewsQuery["order_item"];
}

export default function ProductReviewsTab(props: ProductReviewsTabProps) {
  const { reviews, orders } = props;

  const [activeTab, setActiveTab] = useState("to-review");

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="to-review" className="text-sm md:text-base">
            Değerlendirilmeyenler
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="text-sm md:text-base">
            Değerlendirilenler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="to-review">
          <NotReviewedCard orders={orders} />
        </TabsContent>

        <TabsContent value="reviewed">
          <ReviewedCard reviews={reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
