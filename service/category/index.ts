export const GetCategoriesDocument = `query getMainCategories {
  category(where: {parent_category_id: {_is_null: true}}) {
    id
    image_url
    name
    slug
  }
}`;
