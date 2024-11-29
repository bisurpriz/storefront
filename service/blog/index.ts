export const GetBlogPostIdsAndSlugDocument = `
    query getBlogPostIdsAndSlug {
  blog {
    id
    slug
  }
}
    `;

export const GetStaticBlogPostsDocument = `
    query getStaticBlogPosts {
  blog {
    slug
    id
    title
    summary
    created_at
  }
}
    `;

export const GetBlogPostDocument = `
    query getBlogPost($slug: String!) {
  blog(where: {slug: {_eq: $slug}}) {
    id
    created_at
    updated_at
    title
    summary
    author
    content
    slug
    meta_title
    meta_description
    keywords
    featured_image
    categories
  }
}
    `;
