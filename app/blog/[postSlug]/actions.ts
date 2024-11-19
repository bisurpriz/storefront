"use server";

import { query } from "@/graphql/lib/client";
import {
  GetBlogPostDocument,
  GetBlogPostIdsAndSlugDocument,
  GetBlogPostIdsAndSlugQuery,
  GetBlogPostQuery,
  GetStaticBlogPostsDocument,
  GetStaticBlogPostsQuery,
} from "@/graphql/queries/blog/blogPost.generated";

export const getStaticBlogPostPaths = async () => {
  return await query<GetBlogPostIdsAndSlugQuery>({
    query: GetBlogPostIdsAndSlugDocument,
  });
};

export const getStaticBlogPosts = async () => {
  return await query<GetStaticBlogPostsQuery>({
    query: GetStaticBlogPostsDocument,
  });
};

export const getBlogPostIdsAndSlug = async (slug) => {
  return await query<GetBlogPostQuery>({
    query: GetBlogPostDocument,
    variables: {
      slug,
    },
  });
};
