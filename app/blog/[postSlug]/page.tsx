import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrlFromPath } from "@/lib/utils";
import { localeFormat } from "@/utils/format";
import { CalendarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";
import { getBlogPostIdsAndSlug } from "./actions";

const cachedGetBlogPostIdsAndSlug = cache(getBlogPostIdsAndSlug);

export async function generateStaticParams() {
  const response = await fetch(process.env.BLOG_ID_AND_SLUG_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

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

  const post = blog?.[0];

  if (!post) {
    return {
      title: "Yazı bulunamadı",
      description: "İlgili yazı bulunamadı.",
      creator: "Bonnmarşe",
    };
  }

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

export const revalidate = 604800;
export const dynamic = "force-static";

export default async function BlogPostPage({ params }) {
  const { postSlug } = await params;
  const { blog } = await cachedGetBlogPostIdsAndSlug(postSlug);

  const post = blog?.[0];

  if (!post) {
    return <div>Yazı bulunamadı</div>;
  }

  return (
    <article className="container max-w-5xl px-4 py-8 mx-auto prose prose-lg dark:prose-invert max-md:prose-sm">
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
              <CalendarIcon className="w-4 h-4 mr-1" />
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
          className="object-cover mx-auto rounded-lg"
        />
        <figcaption className="mt-2 text-sm text-center text-muted-foreground">
          {post.title}
        </figcaption>
      </figure>

      <div
        className="prose-sm prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
