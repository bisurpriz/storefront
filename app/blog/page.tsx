"use client";

import { Link } from "@/components/Link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBlogPostUrl } from "@/utils/getBlogPostUrl";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

// Örnek blog post verileri
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    description:
      "Learn the basics of React and start building your first application.",
    date: "2023-05-15",
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    category: "React",
    slug: "getting-started-with-react",
  },
  {
    id: 2,
    title: "Advanced TypeScript Techniques",
    description:
      "Dive deep into TypeScript and learn advanced concepts and patterns.",
    date: "2023-05-20",
    author: {
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    category: "TypeScript",
    slug: "advanced-typescript-techniques",
  },
  {
    id: 3,
    title: "Building Scalable Node.js Applications",
    description:
      "Learn how to build and scale Node.js applications for production.",
    date: "2023-05-25",
    author: {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    category: "Node.js",
    slug: "building-scalable-nodejs-applications",
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase()),
  );

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
      <div className="mb-8 flex gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="TypeScript">TypeScript</SelectItem>
            <SelectItem value="Node.js">Node.js</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={getBlogPostUrl(post.slug, post.id)}
                  className="text-lg font-semibold hover:underline"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon size={16} className="mr-1" />
                {post.date}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
