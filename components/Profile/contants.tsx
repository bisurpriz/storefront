import Link from "next/link";

export const profileItems = [
  {
    label: (
      <Link
        href="/account/orders"
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
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
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
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
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
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
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
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
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
      >
        Üyelik Bilgilerim
      </Link>
    ),
    value: "hesabim",
    searchValue: "Üyelik Bilgilerim",
  },
  {
    label: (
      <Link
        href="/api/auth/logout"
        className="block p-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-normal"
      >
        Çıkış Yap
      </Link>
    ),
    value: "cikis",
    searchValue: "Çıkış Yap",
  },
];
