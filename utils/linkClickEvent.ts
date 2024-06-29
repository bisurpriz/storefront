export const goToProductDetail = ({
  category,
  slug,
  id,
}: {
  category: {
    slug: string;
  };
  slug: string;
  id: string | number;
}) => {
  return `/${category.slug}/${slug}?pid=${id}`;
};
