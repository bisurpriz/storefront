import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const footerData = [
  {
    title: "KURUMSAL",
    links: [
      {
        name: "Hakkımızda",
        path: "/hakkimizda",
      },
      {
        name: "İletişim",
        path: "/iletisim",
      },
      {
        name: "Kariyer",
        path: "/kariyer",
      },
    ],
  },
  {
    title: "YARDIM",
    links: [
      {
        name: "Sıkça Sorulan Sorular",
        path: "/sss",
      },
      {
        name: "Kullanım Koşulları",
        path: "/kullanim-kosullari",
      },
      {
        name: "Gizlilik Politikası",
        path: "/gizlilik-politikasi",
      },
    ],
  },
  {
    title: "YASAL",
    links: [
      {
        name: "Tüketici Hakları",
        path: "/tuketici-haklari",
      },
      {
        name: "Mesafeli Satış Sözleşmesi",
        path: "/mesafeli-satis-sozlesmesi",
      },
      {
        name: "KVK Politikası",
        path: "/kvk-politikasi",
      },
    ],
  },
  {
    title: "SOSYAL MEDYA",
    links: [
      {
        name: "Facebook",
        path: "/facebook",
      },
      {
        name: "Twitter",
        path: "/twitter",
      },
      {
        name: "Instagram",
        path: "/instagram",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer
      aria-label="Alt Bilgi"
      aria-describedby="Alt bilgi"
      className="flex items-center justify-center w-full max-md:hidden  mt-10 max-md:mt-20 max-sm:mt-16 bg-secondary"
    >
      <div className="w-full px-4 pt-4 pb-8 text-white md:container mx-auto">
        <div className="flex items-start justify-between w-full ">
          {footerData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center w-full space-y-4"
            >
              <h3
                className={clsx(
                  "text-lg font-semibold font-sans",
                  "underline underline-offset-2  select-none"
                )}
              >
                {item.title}
              </h3>
              <ul className="flex flex-col items-start justify-center w-full space-y-2 font-mono">
                {item.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className={clsx(
            "flex items-center justify-start w-full mt-8",
            "border-t border-white text-slate-600 font-manrope text-xs"
          )}
        >
          <Link
            href="https://www.eticaret.gov.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 whitespace-nowrap h-24 mt-2"
          >
            <Image
              src="https://www.eticaret.gov.tr/images/logo1.png"
              alt="ETBİS"
              width={96}
              height={96}
              layout="responsive"
              quality={100}
            />
            Bonnmarşe ETBİS&apos;e üye bir firmadır.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
