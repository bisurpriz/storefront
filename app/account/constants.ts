import { AiOutlineUnlock, AiOutlineUser } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { RiCoupon2Line } from "react-icons/ri";

export const accountNavigationItems = [
  {
    title: "Siparişlerim",
    icon: BsTruck,
    link: "/account/orders",
  },
  {
    title: "Kuponlarım",
    icon: RiCoupon2Line,
    link: "/account/coupons",
  },
  {
    title: "Favorilerim",
    icon: MdOutlineFavoriteBorder,
    link: "/account/favorites",
  },
  {
    title: "Değerlendirmelerim",
    icon: FiStar,
    link: "/account/reviews",
  },
  {
    title: "Bilgilerim",
    icon: AiOutlineUser,
    link: "/account",
  },
  {
    title: "Mesajlarım",
    icon: FiMessageSquare,
    link: "/account/messages",
  },
  {
    title: "Adreslerim",
    icon: PiAddressBook,
    link: "/account/addresses",
  },
  {
    title: "İzinlerim",
    icon: AiOutlineUnlock,
    link: "/account/permissions",
  },
];
