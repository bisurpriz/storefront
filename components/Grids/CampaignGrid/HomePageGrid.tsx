import { Link } from "@/components/Link";
import { Image } from "@/components/ui/image";
import { GetBannersQuery } from "@/graphql/queries/banners/banners.generated";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { GetBannersDocument } from "@/service/banner";
import { BonnmarseApi } from "@/service/fetch";

const HomePageGrid = async () => {
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
    <div className="grid grid-cols-12 gap-2 my-4">
      {system_banner?.map((_, index) => {
        const positionInCycle = index % 5;
        const isCol4 = positionInCycle < 3;
        const isCol6 = positionInCycle >= 3;
        return (
          <Link
            key={_.id}
            href={_.redirect_link}
            className={cn(
              "aspect-[640/258] overflow-hidden rounded-lg max-md:col-span-full md:col-span-4",
              {
                "md:col-span-4": isCol4,
                "md:col-span-6": isCol6,
              },
            )}
          >
            <Image
              src={getImageUrlFromPath(_.path)}
              alt={_.name}
              className="w-full h-full"
              width={isCol6 ? 1200 : 800}
              quality={100}
              height={isCol6 ? 600 : 400}
              priority={index < 3}
              objectFit="cover"
              sizes={
                isCol6
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 800px"
              }
              imageClassName="w-full h-full"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default HomePageGrid;
