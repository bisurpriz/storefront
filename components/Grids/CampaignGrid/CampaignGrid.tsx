import { FC } from "react";
import Image from "next/image";
import { Link } from "@/components/Link";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getBanners } from "@/app/actions";

const getImageUrl = (image: string) => {
  if (!image) return "https://via.placeholder.com/500";

  return `${getImageUrlFromPath(image)}?format=wepb&quality=75`;
};

const CampaignGrid: FC = async () => {
  const { banners } = await getBanners();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4">
      {banners.map((item, i) => (
        <Link
          href={item.redirect_link}
          className="w-full relative"
          key={item.id}
        >
          <Image
            className="rounded-lg w-full h-auto"
            alt={item.name}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            sizes="(max-width: 576px) 50vw,
            (max-width: 768px) 50vw,
            (max-width: 992px) 50vw,
            (min-width: 1200px) 50vw"
            width={676}
            height={272}
            src={getImageUrl(item.path)}
            priority={true}
            loading="eager"
            style={{ objectFit: "cover" }}
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignGrid;
