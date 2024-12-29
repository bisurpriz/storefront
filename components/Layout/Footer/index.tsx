import FacebookIcon from "@/components/CustomIcons/Facebook";
import InstagramIcon from "@/components/CustomIcons/Instagram";
import TwitterIcon from "@/components/CustomIcons/Twitter";
import { Link } from "@/components/Link";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";
import clsx from "clsx";
import Image from "next/image";

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
        path: "/gizlilik-sozlesmesi",
      },
    ],
  },
  {
    title: "YASAL",
    links: [
      {
        name: "Teslim ve İade Politikası",
        path: "/teslim-iade-politikamiz",
      },
      {
        name: "Mesafeli Satış Sözleşmesi",
        path: "/mesafeli-satis-sozlesmesi",
      },
      {
        name: "KVKK Politikası",
        path: "/kvkk-politikasi",
      },
    ],
  },
  {
    title: "SOSYAL MEDYA",
    links: [
      {
        name: "Facebook",
        path: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
        icon: <FacebookIcon />,
      },
      {
        name: "Twitter",
        path: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
        icon: <TwitterIcon />,
      },
      {
        name: "Instagram",
        path: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        icon: <InstagramIcon />,
      },
    ],
  },
];

const Footer = async () => {
  const viewport = await getServerSideViewPort();

  return (
    <footer
      aria-label="Alt Bilgi"
      aria-describedby="Alt bilgi"
      className="flex w-full items-center justify-center bg-gray-50 max-md:mt-20 max-md:hidden max-sm:mt-16"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-4 text-gray-700">
        <div className="flex w-full items-start justify-between">
          {footerData.map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-center space-y-4"
            >
              <h3
                className={clsx(
                  "font-sans text-lg font-semibold",
                  "select-none underline underline-offset-2",
                )}
              >
                {item.title}
              </h3>
              <ul className="flex w-full flex-col items-start justify-center space-y-2 font-mono">
                {item.links.map((link, index) => (
                  <li key={index} className="group">
                    <Link
                      href={link.path}
                      target={viewport === "mobile" ? "_blank" : "_self"}
                      rel={
                        link.path.startsWith("http")
                          ? "noopener noreferrer"
                          : ""
                      }
                      className="flex items-center gap-1 text-sm transition-all duration-300 ease-in-out group-hover:text-secondary"
                    >
                      <span className="text-2xl group-hover:scale-105">
                        {link.icon && link.icon}
                      </span>
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
            "mt-8 flex w-full items-end justify-start gap-8",
            "border-t border-gray-300 font-manrope text-xs text-slate-600",
          )}
        >
          <Link
            href="https://www.eticaret.gov.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex flex-col items-center gap-2 whitespace-nowrap"
          >
            <Image
              src="https://www.eticaret.gov.tr/images/logo1.png"
              alt="ETBİS"
              width={200}
              height={200}
              priority
              quality={100}
              className="h-10 w-auto"
            />
            Bonnmarşe ETBİS&apos;e üye bir firmadır.
          </Link>
          <Link
            href="https://www.iyzico.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex flex-col items-center gap-2 whitespace-nowrap"
          >
            <Image
              src="/payment/iyzico-ode.png"
              alt="iyzico"
              className="h-10 w-auto"
              width={400}
              priority
              height={200}
              quality={100}
            />
            Ödeme işlemleri iyzico güvencesi ile sağlanmaktadır.
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
