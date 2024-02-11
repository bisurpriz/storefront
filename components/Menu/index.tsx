'use client';

import Link from 'next/link';
import { useMeasure } from '@uidotdev/usehooks';

const Menu: React.FC<MenuProps> = ({
  items,
  orientation = 'horizontal',
  className = '',
}) => {
  const [listRef] = useMeasure<HTMLElement>();

  const emptyItemSkeleton = (
    <div className="h-10 bg-gray-200 animate-pulse"></div>
  );

  return (
    <nav
      className={`font-mono bg-transparent font-medium w-full border-y ${className}`}
      ref={listRef}
    >
      {items ? (
        <ul
          className={`${
            orientation === 'horizontal' ? 'inline-flex' : 'block'
          }  text-base leading-4 w-full py-2`}
        >
          {items?.map((item, index) => (
            <li key={index} className="relative group cursor-pointer">
              <Link
                href={item.link ?? '#'}
                className="flex items-center justify-center h-full w-full p-2 px-4 font-semibold hover:text-gray-600 transition-colors duration-200 ease-in-out hover:bg-gray-100 rounded-md"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        emptyItemSkeleton
      )}
    </nav>
  );
};

export default Menu;
