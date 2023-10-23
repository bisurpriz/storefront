import Divider from "@/components/Divider";
import Link from "next/link";
import React from "react";

const headerTopLeftMenu = [
  {
    label: "About Us",
    link: "about-us",
  },
  {
    label: "My Account",
    link: "my-account",
  },
  {
    label: "Wishlist",
    link: "wishlist",
  },
  {
    label: "Order Tracking",
    link: "order-tracking",
  },
];

const HeaderTop = () => {
  return (
    <div className="w-full max-sm:hidden max-md:px-4 container mx-auto">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 `}>
          {headerTopLeftMenu.map((item, index) => {
            return (
              <div key={item.link}>
                <Link
                  href={`/${item.link}`}
                  className="hover:text-primary-dark whitespace-nowrap w-fit"
                >
                  {item.label}
                </Link>

                {index !== headerTopLeftMenu.length - 1 && (
                  <Divider orientation="vertical" color="gray-300" />
                )}
              </div>
            );
          })}
        </div>
        <p className="flex flex-grow-1 w-full justify-center gap-1 text-gray-500 font-medium flex-wrap max-md:hidden">
          Get great devices up to 50% off{" "}
          <Link
            href="/campaign-details"
            className="text-primary hover:text-primary-dark"
          >
            view details
          </Link>
        </p>
        <ul className="text-right whitespace-nowrap">
          <li>
            Bisürpriz&apos;de satış yapmak ister misiniz?&nbsp;
            <Link
              href="/campaign-details"
              className="text-primary hover:text-primary-dark"
            >
              Satıcı Paneli
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
