import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function BlogPostSection() {
  const blogPosts = [
    {
      title:
        "Çiçek Bakımı: Evinizde Çiçekleri Uzun Süre Canlı Tutmanın Yolları",
      description:
        "Evinizde çiçeklerin daha uzun süre canlı kalması için pratik ipuçları ve bakım önerileri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/cicek-bakimi",
    },
    {
      title: "Özel Günler İçin Yaratıcı Hediye Fikirleri",
      description:
        "Sevdiklerinizi şaşırtacak ve mutlu edecek benzersiz hediye önerileri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/hediye-fikirleri",
    },
    {
      title: "Yılbaşı İçin Ev Dekorasyon Önerileri",
      description:
        "Evinizi yılbaşı ruhuna bürüyecek şık ve ekonomik dekorasyon fikirleri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/yilbasi-dekorasyonu",
    },
    {
      title:
        "Çiçek Bakımı: Evinizde Çiçekleri Uzun Süre Canlı Tutmanın Yolları",
      description:
        "Evinizde çiçeklerin daha uzun süre canlı kalması için pratik ipuçları ve bakım önerileri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/cicek-bakimi",
    },
    {
      title: "Özel Günler İçin Yaratıcı Hediye Fikirleri",
      description:
        "Sevdiklerinizi şaşırtacak ve mutlu edecek benzersiz hediye önerileri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/hediye-fikirleri",
    },
    {
      title: "Yılbaşı İçin Ev Dekorasyon Önerileri",
      description:
        "Evinizi yılbaşı ruhuna bürüyecek şık ve ekonomik dekorasyon fikirleri.",
      image: "https://via.placeholder.com/300x200",
      link: "/blog/yilbasi-dekorasyonu",
    },
  ];

  return (
    <section aria-label="Blog ve İçerik" aria-labelledby="blog-ve-icerik">
      <div className="my-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Blog ve İçerik</h2>
          <Link href="/blog" passHref>
            <Button variant="outline">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {blogPosts.map((post, index) => (
              <CarouselItem className="basis-1/2 max-xs:basis-full md:basis-1/3 2xl:basis-1/4">
                <div key={index} className={cn("w-full px-2")}>
                  <Card key={index} className="overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                    <CardContent className="prose prose-base p-4 max-md:prose-sm">
                      <h3 className="!h-18 line-clamp-2">{post.title}</h3>
                      <p className="line-clamp-2 text-muted-foreground">
                        {post.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4">
                      <Link href={post.link} passHref>
                        <Button variant="link" className="p-0">
                          Devamını Oku
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
