import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { CalendarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";
import { getBlogPostIdsAndSlug } from "./actions";

export const revalidate = 3600;
export const dynamicParams = false;

const cachedGetBlogPostIdsAndSlug = cache(getBlogPostIdsAndSlug);

export async function generateStaticParams() {
  const response = await fetch(
    "https://devapi.bonnmarse.com/api/rest/getblogpostidsandslug",
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const { blog } = await response.json();

  return blog.map(({ slug, id }) => {
    return {
      params: {
        postSlug: slug,
      },
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ postSlug: string }>;
}): Promise<Metadata> {
  const { postSlug } = await props.params;

  const { blog } = await getBlogPostIdsAndSlug(postSlug);

  const post = blog[0];

  return {
    title: `${post?.title} | Bonnmarşe`,
    description: post?.summary,
    creator: post?.author,
    icons: [
      {
        rel: "icon",
        url: getImageUrlFromPath(post?.featured_image),
      },
    ],
    keywords: post?.keywords,
    robots: "index, follow",
  };
}

export default async function BlogPostPage({ params }) {
  const { postSlug } = await params;
  const { blog } = await cachedGetBlogPostIdsAndSlug(postSlug);

  const post = blog[0];

  if (!post) {
    return null;
  }

  return (
    <article className="container prose prose-lg mx-auto max-w-5xl px-4 py-8 dark:prose-invert max-md:prose-sm">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Yazar"
            />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="!m-0 text-base font-semibold">{post.author}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <time dateTime="2023-11-10">
                {localeFormat(new Date(post.created_at), "dd MMMM yyyy")}
              </time>
            </div>
          </div>
        </div>
      </header>

      <figure className="mb-8">
        <Image
          src={getImageUrlFromPath(post.featured_image)}
          alt={post.title}
          width={800}
          height={400}
          className="mx-auto rounded-lg object-cover"
        />
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {post.title}
        </figcaption>
      </figure>

      <div
        className="prose prose-sm"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
