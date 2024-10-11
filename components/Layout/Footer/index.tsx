import FacebookIcon from "@/components/CustomIcons/Facebook";
import InstagramIcon from "@/components/CustomIcons/Instagram";
import TwitterIcon from "@/components/CustomIcons/Twitter";
import clsx from "clsx";
import Image from "next/image";
import { Link } from "@/components/Link";

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

const Footer = () => {
  return (
    <footer
      aria-label="Alt Bilgi"
      aria-describedby="Alt bilgi"
      className="flex items-center justify-center w-full max-md:hidden  mt-10 max-md:mt-20 max-sm:mt-16 bg-gray-50"
    >
      <div className="w-full px-4 pt-4 pb-8 text-gray-700 max-w-screen-2xl mx-auto">
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
                  <li key={index} className="group ">
                    <Link
                      href={link.path}
                      target={link.path.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        link.path.startsWith("http")
                          ? "noopener noreferrer"
                          : ""
                      }
                      className="text-sm flex items-center gap-1 group-hover:text-secondary transition-all ease-in-out duration-300"
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
            "flex items-end justify-start gap-8 w-full mt-8",
            "border-t border-gray-300 text-slate-600 font-manrope text-xs"
          )}
        >
          <Link
            href="https://www.eticaret.gov.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 whitespace-nowrap mt-2"
          >
            <Image
              src="https://www.eticaret.gov.tr/images/logo1.png"
              alt="ETBİS"
              width={200}
              height={200}
              quality={100}
              className="w-full h-20"
            />
            Bonnmarşe ETBİS&apos;e üye bir firmadır.
          </Link>
          <Link
            href="https://www.iyzico.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 whitespace-nowrap mt-2"
          >
            <Image
              src="/payment/iyzico-ode.png"
              alt="iyzico"
              className="w-full h-20"
              width={400}
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
