import { Link } from "@/components/Link";
import LogoutButton from "../LogoutButton";

export const profileItems = [
  {
    label: (
      <Link
        href="/account/orders"
        className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
      >
        Siparişlerim
      </Link>
    ),
    value: "siparislerim",
    searchValue: "Siparişlerim",
  },
  {
    label: (
      <Link
        href="/account/coupons"
        className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
      >
        Kuponlarım
      </Link>
    ),
    value: "kuponlarim",
    searchValue: "Kuponlarım",
  },
  {
    label: (
      <Link
        href="/account/reviews"
        className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
      >
        Değerlendirmelerim
      </Link>
    ),
    value: "degerlendirmelerim",
    searchValue: "Değerlendirmelerim",
  },
  {
    label: (
      <Link
        href="/account/favorites"
        className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
      >
        Favorilerim
      </Link>
    ),
    value: "favorilerim",
    searchValue: "Favorilerim",
  },
  {
    label: (
      <Link
        href="/account"
        className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
      >
        Üyelik Bilgilerim
      </Link>
    ),
    value: "hesabim",
    searchValue: "Üyelik Bilgilerim",
  },
  {
    label: <LogoutButton />,
    value: "cikis",
    searchValue: "Çıkış Yap",
  },
];
