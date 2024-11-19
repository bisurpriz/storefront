import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetBlogPostIdsAndSlugQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBlogPostIdsAndSlugQuery = { blog: Array<{ id: number, slug: string }> };

export type GetStaticBlogPostsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetStaticBlogPostsQuery = { blog: Array<{ slug: string, id: number, title: string, summary?: string | null, created_at: any }> };

export type GetBlogPostQueryVariables = Types.Exact<{
  slug: Types.Scalars['String']['input'];
}>;


export type GetBlogPostQuery = { blog: Array<{ id: number, created_at: any, updated_at: any, title: string, summary?: string | null, author?: string | null, content: string, slug: string, meta_title: string, meta_description: string, keywords: Array<string>, featured_image: string, categories: Array<number> }> };


export const GetBlogPostIdsAndSlugDocument = gql`
    query getBlogPostIdsAndSlug {
  blog {
    id
    slug
  }
}
    `;
export type GetBlogPostIdsAndSlugQueryResult = Apollo.QueryResult<GetBlogPostIdsAndSlugQuery, GetBlogPostIdsAndSlugQueryVariables>;
export const GetStaticBlogPostsDocument = gql`
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
export type GetStaticBlogPostsQueryResult = Apollo.QueryResult<GetStaticBlogPostsQuery, GetStaticBlogPostsQueryVariables>;
export const GetBlogPostDocument = gql`
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
export type GetBlogPostQueryResult = Apollo.QueryResult<GetBlogPostQuery, GetBlogPostQueryVariables>;