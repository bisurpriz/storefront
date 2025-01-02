import { Link } from "@/components/Link";
import { GetBannersQuery } from "@/graphql/queries/banners/banners.generated";
import { cn, getImageUrlFromPath } from "@/lib/utils";
import { GetBannersDocument } from "@/service/banner";
import { BonnmarseApi } from "@/service/fetch";
import Image from "next/image";

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
    <div className="my-4 grid grid-cols-12 gap-2">
      {system_banner?.map((_, index) => {
        const positionInCycle = index % 5;
        const isCol4 = positionInCycle < 3;
        const isCol6 = positionInCycle >= 3;
        return (
          <Link
            key={index}
            href={_.redirect_link!}
            className={cn(
              "aspect-[640/258] overflow-hidden rounded-lg max-md:col-span-full md:col-span-4",
              {
                "md:col-span-4": isCol4,
                "md:col-span-6": isCol6,
              },
            )}
          >
            <Image
              src={getImageUrlFromPath(_.path!)}
              alt={_.name!}
              className="h-full w-full object-cover"
              width={isCol6 ? 800 : 600}
              height={isCol6 ? 400 : 300}
              priority={index < 3}
              quality={85}
              sizes={
                isCol6
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 600px"
              }
              loading={index < 3 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                `<svg width="${isCol6 ? 800 : 600}" height="${
                  isCol6 ? 400 : 300
                }" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`,
              ).toString("base64")}`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default HomePageGrid;
