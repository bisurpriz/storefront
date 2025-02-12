"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetVendorCouponsQuery } from "@/graphql/queries/vendors/getVendorById.generated";
import { toast } from "@/hooks/use-toast";
import { getImageUrlFromPath } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import {
  BadgeCheck,
  Bell,
  Check,
  Copy,
  Heart,
  ShoppingBag,
  Star,
  Store,
  Ticket,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TenantHeaderProps {
  title: string;
  joinedDate: string;
  logoUrl: string;
  id: string;
  productsCount: number;
  reviewsCount: number;
  productScoreAverage: number;
  couponsCount: number;
  coupons: GetVendorCouponsQuery["coupon"];
}

const TenantHeader = ({
  title,
  joinedDate,
  logoUrl,
  id,
  productsCount,
  reviewsCount,
  productScoreAverage,
  couponsCount,
  coupons,
}: TenantHeaderProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const joinedTimeAgo = formatDistanceToNow(new Date(joinedDate), {
    addSuffix: true,
    locale: tr,
  });

  const handleShare = async () => {
    // Mobil cihazlarda native share API'yi kullan
    if (navigator.share && window.innerWidth <= 768) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Paylaşım sırasında bir hata oluştu:", error);
        }
      }
    } else {
      // Desktop'ta clipboard API'yi kullan
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        toast({
          title: "Bağlantı kopyalandı!",
        });

        // 2 saniye sonra ikonu geri döndür
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        toast({
          title: "Bağlantı kopyalanırken bir hata oluştu",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="space-y-6 rounded-2xl">
          {/* Store Header */}
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
            {/* Logo & Title */}
            <div className="flex flex-col items-center w-full gap-4 lg:w-auto lg:flex-row">
              <div className="relative">
                <div className="relative overflow-hidden border-4 border-white shadow-lg h-28 w-28 rounded-xl lg:h-36 lg:w-36">
                  <Image
                    src={getImageUrlFromPath(logoUrl)}
                    alt={`${title} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge
                  variant="new"
                  className="absolute -bottom-2 right-0 px-2 py-0.5"
                >
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  Onaylı
                </Badge>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 font-manrope lg:text-3xl">
                    {title}
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {joinedTimeAgo} katıldı
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center w-full gap-2 lg:ml-auto lg:w-auto lg:justify-end">
              <Button variant="outline" size="sm" onClick={handleShare}>
                {isCopied ? (
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {isCopied ? "Kopyalandı" : "Paylaş"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-pink-500 hover:bg-pink-600 hover:text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorilere Ekle
              </Button>
            </div>
          </div>

          {/* Store Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="grid p-4 transition-all place-items-center rounded-xl bg-purple-50 hover:bg-purple-100">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">
                {productsCount}
              </span>
              <span className="text-sm text-center text-gray-600">Ürün</span>
            </div>

            <div className="grid p-4 transition-all place-items-center rounded-xl bg-yellow-50 hover:bg-yellow-100">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900">
                {reviewsCount}
              </span>
              <span className="text-sm text-center text-gray-600">
                Değerlendirme
              </span>
            </div>

            <div className="grid p-4 transition-all place-items-center rounded-xl bg-blue-50 hover:bg-blue-100">
              <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                {productScoreAverage > 5
                  ? "5.0"
                  : productScoreAverage?.toFixed(1)}
              </span>
              <span className="text-sm text-center text-gray-600">
                Genel Ürün Puanı
              </span>
            </div>

            <div className="grid p-4 transition-all place-items-center rounded-xl bg-pink-50 hover:bg-pink-100">
              <Truck className="w-6 h-6 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">Var</span>
              <span className="text-sm text-center text-gray-600">
                Aynı Gün Teslimat
              </span>
            </div>
          </div>

          {/* Coupon Info */}
          <div className="mt-4 overflow-x-auto">
            <div className="flex gap-4 p-4 text-sm border border-gray-200 rounded-xl bg-gray-50">
              {coupons && coupons.length > 0 ? (
                <>
                  {coupons.slice(0, 3).map((coupon) => (
                    <div
                      key={coupon.id}
                      className="flex items-center justify-center gap-2 p-3 font-semibold text-gray-600 bg-white rounded-lg"
                    >
                      <Ticket className="w-5 h-5 text-purple-500" />
                      <span>
                        {coupon.code} - {coupon.amount}₺ İndirim
                        {coupon.minimum_cost &&
                          ` (Min. ${coupon.minimum_cost}₺)`}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 p-3 font-semibold text-gray-600 bg-white rounded-lg">
                    <Ticket className="w-5 h-5 text-gray-400" />
                    <span>Aktif Kupon Bulunmuyor</span>
                  </div>
                  <div className="items-center justify-center hidden gap-2 p-3 font-semibold text-gray-600 bg-white rounded-lg md:flex">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span>Yeni Kuponlar için Takipte Kalın</span>
                  </div>
                  <div className="hidden min-w-[280px] items-center justify-center gap-2 rounded-lg bg-white p-3 font-semibold text-gray-600 md:flex">
                    <Store className="w-5 h-5 text-gray-400" />
                    <span>Mağazayı Takip Et</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantHeader;
