import { Link } from "@/components/Link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GetBannersQuery } from "@/graphql/queries/banners/banners.generated";
import { getImageUrlFromPath } from "@/lib/utils";
import { GetBannersDocument } from "@/service/banner";
import { BonnmarseApi } from "@/service/fetch";
import Image from "next/image";

export async function BannerCarousel() {
  const { system_banner } = await BonnmarseApi.request<GetBannersQuery>({
    query: GetBannersDocument,
    tags: ["system_banner"],
    withAuth: false,
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
  });

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {system_banner.map((banner, index) => (
          <CarouselItem
            key={index}
            className="relative flex max-h-[200px] items-center justify-center"
          >
            <Link
              href={banner.redirect_link!}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={getImageUrlFromPath(banner.path!)}
                alt={banner.name!}
                width={800}
                height={400}
                priority
                className="w-full object-contain"
                sizes="(max-width: 768px) 50vw, 100vw"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
