import FacebookIcon from "@/components/CustomIcons/Facebook";
import InstagramIcon from "@/components/CustomIcons/Instagram";
import TwitterIcon from "@/components/CustomIcons/Twitter";
import { Link } from "@/components/Link";
import { getServerSideViewPort } from "@/utils/getServerSideViewPort";
import Image from "next/image";
import { memo } from "react";

// Sosyal medya ikonlarını memo ile sarmalayalım
const SocialIcon = memo(({ icon }: { icon: React.ReactNode }) => (
  <span className="text-2xl">{icon}</span>
));

SocialIcon.displayName = "SocialIcon";

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
] as const;

// FooterSection bileşenini ayırıp memo ile sarmalayalım
const FooterSection = memo(
  ({
    title,
    links,
    viewport,
  }: {
    title: string;
    links: (typeof footerData)[number]["links"];
    viewport: string;
  }) => (
    <div className="flex w-full flex-col items-start justify-center space-y-4">
      <h3 className="select-none font-sans text-lg font-semibold underline underline-offset-2">
        {title}
      </h3>
      <ul className="flex w-full flex-col items-start justify-center space-y-2 font-mono">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.path}
              target={viewport === "mobile" ? "_blank" : "_self"}
              rel={link.path.startsWith("http") ? "noopener noreferrer" : ""}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-secondary"
            >
              {link.icon && <SocialIcon icon={link.icon} />}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ),
);

FooterSection.displayName = "FooterSection";

// Footer logoları için ayrı bir bileşen
const FooterLogo = memo(
  ({
    href,
    src,
    alt,
    description,
  }: {
    href: string;
    src: string;
    alt: string;
    description: string;
  }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex flex-col items-center gap-2 whitespace-nowrap"
    >
      <Image
        src={src}
        alt={alt}
        width={150}
        height={40}
        loading="lazy"
        className="h-10 w-[150px] object-contain"
        sizes="150px"
      />
      <span className="text-xs text-slate-600">{description}</span>
    </Link>
  ),
);

FooterLogo.displayName = "FooterLogo";

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
          {footerData.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              links={section.links}
              viewport={viewport}
            />
          ))}
        </div>
        <div className="mt-8 flex w-full items-end justify-start gap-8 border-t border-gray-300">
          <FooterLogo
            href="https://www.eticaret.gov.tr/"
            src="https://www.eticaret.gov.tr/images/logo1.png"
            alt="ETBİS"
            description="Bonnmarşe ETBİS'e üye bir firmadır."
          />
          <FooterLogo
            href="https://www.iyzico.com/"
            src="/payment/iyzico-ode.png"
            alt="iyzico"
            description="Ödeme işlemleri iyzico güvencesi ile sağlanmaktadır."
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
