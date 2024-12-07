export const GetCategoriesDocument = `query getMainCategories @cached(ttl: 3600) {
  category(where: {parent_category_id: {_is_null: true}}) {
    id
    image_url
    name
    slug
  }
}`;
