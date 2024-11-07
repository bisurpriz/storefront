import { Link } from "@/components/Link";

const headerTopLeftMenu = [
  {
    label: "Hakkımızda",
    link: "hakkimizda",
  },
  {
    label: "Hesabım",
    link: "account",
  },
  {
    label: "İletişim",
    link: "iletisim",
  },
  {
    label: "Sipariş Takibi",
    link: "siparis-takip",
  },
];

const HeaderTop = () => {
  return (
    <div className="mt-1 w-full px-4 text-xs max-sm:hidden">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2`}>
          {headerTopLeftMenu.map((item, index) => (
            <div key={item.link}>
              <Link
                href={`/${item.link}`}
                className="w-fit whitespace-nowrap font-normal hover:text-primary"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        {/*  <p className="flex flex-grow-1 w-full justify-center gap-1 text-gray-500 font-medium flex-wrap max-lg:hidden">
          Sevgililer gününe özel&nbsp;
          <Link
            href="/campaign-details"
            className="text-primary hover:text-primary-dark"
          >
            ürünler!
          </Link>
        </p> */}
        <ul className="whitespace-nowrap text-right">
          <li>
            Bonnmarşe&apos;de satış yapmak ister misiniz?&nbsp;
            <Link
              href={process.env.NEXT_PUBLIC_SELLER_PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary"
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
