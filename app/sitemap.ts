import { TypesenseSearchResponse } from "@/types/product";
import { typesenseClient } from "@/typesense/client";
import { MetadataRoute } from "next";
import { getStaticBlogPosts } from "./blog/[postSlug]/actions";
import { getBlogPostUrl } from "@/utils/getBlogPostUrl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_HOST || "https://bonnmarse.com";

  // First get total number of products
  const initialSearch = (await typesenseClient
    .collections("products")
    .documents()
    .search({
      q: "*",
      per_page: 0, // We only need the total count
    })) as TypesenseSearchResponse & { out_of: number };

  const totalProducts = initialSearch.out_of;
  const PAGE_SIZE = 250;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  let allProducts: MetadataRoute.Sitemap = [];

  // Fetch products page by page
  for (let page = 1; page <= totalPages; page++) {
    const searchParameters = {
      q: "*",
      per_page: PAGE_SIZE,
      page,
    };

    const productsResponse = (await typesenseClient
      .collections("products")
      .documents()
      .search(searchParameters)) as TypesenseSearchResponse;

    if (!productsResponse.hits?.length) {
      break;
    }

    const productUrls = productsResponse.hits.map((hit) => ({
      url: `${baseUrl}/${hit.document.slug}?pid=${hit.document.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    allProducts = [...allProducts, ...productUrls];
  }

  // Add blog posts
  const { blog } = await getStaticBlogPosts();
  const blogUrls = blog.map((post) => ({
    url: `${baseUrl}${getBlogPostUrl(post.slug)}`,
    lastModified: new Date(post.created_at).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...allProducts, ...blogUrls];
}
