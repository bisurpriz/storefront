import HeaderMiddle from './Middle';
import HeaderBottom from './Bottom';
import { query } from '@/graphql/lib/client';
import { memo } from 'react';
import { GetCategoriesDocument, GetCategoriesQuery } from '@/graphql/generated';

const Header = async () => {
  const { data: {category} } = await query<GetCategoriesQuery>({
    query: GetCategoriesDocument,
  });

  return (
    <div className="md:container mx-auto z-10 leading-none flex flex-col items-center justify-start max-sm:flex-col-reverse">
      <HeaderMiddle />
      <HeaderBottom categories={category} />
    </div>
  );
};

export default memo(Header);
