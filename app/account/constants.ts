import Coupon from "@/components/Icons/Coupon";
import Heart from "@/components/Icons/Heart";
import Message from "@/components/Icons/Message";
import Star from "@/components/Icons/Star";
import Truck from "@/components/Icons/Truck";
import Unlock from "@/components/Icons/Unlock";
import User from "@/components/Icons/User";

export const accountNavigationItems = [
  {
    title: "Bilgilerim",
    icon: User,
    link: "/account",
  },
  {
    title: "Siparişlerim",
    icon: Truck,
    link: "/account/orders",
  },
  {
    title: "Kuponlarım",
    icon: Coupon,
    link: "/account/coupons",
  },
  {
    title: "Favorilerim",
    icon: Heart,
    link: "/account/favorites",
  },
  {
    title: "Değerlendirmelerim",
    icon: Star,
    link: "/account/reviews",
  },
  {
    title: "Mesajlarım",
    icon: Message,
    link: "/account/messages",
  },
  // {
  //   title: "Adreslerim",
  //   icon: AddressBook,
  //   link: "/account/addresses",
  // },
  {
    title: "İzinlerim",
    icon: Unlock,
    link: "/account/permissions",
  },
];
