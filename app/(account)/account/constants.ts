import {
  Heart,
  MessageSquare,
  Star,
  TicketPercent,
  Truck,
  Unlock,
  User,
} from "lucide-react";

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
    icon: TicketPercent,
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
    icon: MessageSquare,
    link: "/account/messages",
  },
  {
    title: "İzinlerim",
    icon: Unlock,
    link: "/account/permissions",
  },
];
