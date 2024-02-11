import Link from 'next/link';
import { Suspense } from 'react';

const headerTopLeftMenu = [
  {
    label: 'Hakkımızda',
    link: 'about-us',
  },
  {
    label: 'Hesabım',
    link: 'my-account',
  },
  {
    label: 'İletişim',
    link: 'contact-us',
  },
  {
    label: 'Sipariş Takibi',
    link: 'order-tracking',
  },
];

const HeaderTop = () => {
  return (
    <Suspense>
      <div className="w-full max-sm:hidden max-md:px-4 pt-2">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 `}>
            {headerTopLeftMenu.map((item, index) => (
              <div key={item.link}>
                <Link
                  href={`/${item.link}`}
                  className="hover:text-primary-dark whitespace-nowrap w-fit font-normal"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          <p className="flex flex-grow-1 w-full justify-center gap-1 text-gray-500 font-medium flex-wrap max-lg:hidden">
            Sevgililer gününe özel&nbsp;
            <Link
              href="/campaign-details"
              className="text-primary hover:text-primary-dark"
            >
              ürünler!
            </Link>
          </p>
          <ul className="text-right whitespace-nowrap">
            <li>
              Bonnmarşe&apos;de satış yapmak ister misiniz?&nbsp;
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
    </Suspense>
  );
};

export default HeaderTop;
