import { Link } from "@/components/Link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogPostUrl } from "@/utils/getBlogPostUrl";
import { CalendarIcon } from "lucide-react";
import { getStaticBlogPosts } from "./[postSlug]/actions";

export const revalidate = 604800; // 7 days
export const dynamic = "force-static";

export default async function BlogPage() {
  const { blog } = await getStaticBlogPosts();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Bonnmarşe Blog</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blog.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={getBlogPostUrl(post.slug)}
                  className="text-lg font-semibold hover:underline"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.summary}</CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon size={16} className="mr-1" />
                {post.created_at}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
