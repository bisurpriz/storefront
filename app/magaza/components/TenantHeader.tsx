"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetVendorCouponsQuery } from "@/graphql/queries/vendors/getVendorById.generated";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import {
  BadgeCheck,
  Bell,
  Check,
  Copy,
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
  Store,
  Ticket,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

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
        toast.success("Bağlantı kopyalandı!");

        // 2 saniye sonra ikonu geri döndür
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        toast.error("Bağlantı kopyalanırken bir hata oluştu");
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
            <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row">
              <div className="relative">
                <div className="relative h-28 w-28 overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-36 lg:w-36">
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
                  <BadgeCheck className="mr-1 h-3 w-3" />
                  Onaylı
                </Badge>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2">
                  <h1 className="font-manrope text-2xl font-bold text-gray-900 lg:text-3xl">
                    {title}
                  </h1>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {joinedTimeAgo} katıldı
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:ml-auto lg:w-auto lg:justify-end">
              <Button variant="outline" size="sm" onClick={handleShare}>
                {isCopied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {isCopied ? "Kopyalandı" : "Paylaş"}
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Favorilere Ekle
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="mr-2 h-4 w-4" />
                İletişime Geç
              </Button>
            </div>
          </div>

          {/* Store Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="grid place-items-center rounded-xl bg-purple-50 p-4 transition-all hover:bg-purple-100">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">
                {productsCount}
              </span>
              <span className="text-center text-sm text-gray-600">Ürün</span>
            </div>

            <div className="grid place-items-center rounded-xl bg-yellow-50 p-4 transition-all hover:bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900">
                {reviewsCount}
              </span>
              <span className="text-center text-sm text-gray-600">
                Değerlendirme
              </span>
            </div>

            <div className="grid place-items-center rounded-xl bg-blue-50 p-4 transition-all hover:bg-blue-100">
              <Star className="h-6 w-6 fill-blue-600 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                {productScoreAverage.toFixed(1)}
              </span>
              <span className="text-center text-sm text-gray-600">
                Genel Ürün Puanı
              </span>
            </div>

            <div className="grid place-items-center rounded-xl bg-pink-50 p-4 transition-all hover:bg-pink-100">
              <Truck className="h-6 w-6 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">Var</span>
              <span className="text-center text-sm text-gray-600">
                Aynı Gün Teslimat
              </span>
            </div>
          </div>

          {/* Coupon Info */}
          <div className="mt-4 overflow-x-auto">
            <div className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
              {coupons && coupons.length > 0 ? (
                <>
                  {coupons.slice(0, 3).map((coupon) => (
                    <div
                      key={coupon.id}
                      className="flex items-center justify-center gap-2 rounded-lg bg-white p-3 font-semibold text-gray-600"
                    >
                      <Ticket className="h-5 w-5 text-purple-500" />
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
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-3 font-semibold text-gray-600">
                    <Ticket className="h-5 w-5 text-gray-400" />
                    <span>Aktif Kupon Bulunmuyor</span>
                  </div>
                  <div className="hidden items-center justify-center gap-2 rounded-lg bg-white p-3 font-semibold text-gray-600 md:flex">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <span>Yeni Kuponlar için Takipte Kalın</span>
                  </div>
                  <div className="hidden min-w-[280px] items-center justify-center gap-2 rounded-lg bg-white p-3 font-semibold text-gray-600 md:flex">
                    <Store className="h-5 w-5 text-gray-400" />
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
