"use server";

import {
  GetBlogPostIdsAndSlugQuery,
  GetBlogPostQuery,
  GetStaticBlogPostsQuery,
} from "@/graphql/queries/blog/blogPost.generated";
import {
  GetBlogPostDocument,
  GetBlogPostIdsAndSlugDocument,
  GetStaticBlogPostsDocument,
} from "@/service/blog";
import { BonnmarseApi } from "@/service/fetch";

export const getStaticBlogPostPaths = async () => {
  return await BonnmarseApi.request<GetBlogPostIdsAndSlugQuery>({
    query: GetBlogPostIdsAndSlugDocument,
    tags: ["getStaticBlogPostPaths"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
  });
};

export const getStaticBlogPosts = async () => {
  return await BonnmarseApi.request<GetStaticBlogPostsQuery>({
    query: GetStaticBlogPostsDocument,
    tags: ["getStaticBlogPosts"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
  });
};

export const getBlogPostIdsAndSlug = async (slug) => {
  return await BonnmarseApi.request<GetBlogPostQuery>({
    query: GetBlogPostDocument,
    variables: {
      slug,
    },
    tags: ["getBlogPostIdsAndSlug"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
  });
};
