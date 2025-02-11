"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetOrdersWithReviewsQuery } from "@/graphql/queries/review/review.generated";
import { useState } from "react";
import NotReviewedCard from "../NotReviewed/NotReviewedCard";
import ReviewedCard from "../Reviewed/ReviewedCard";

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
        <TabsList className="mb-4 grid w-full grid-cols-2">
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
