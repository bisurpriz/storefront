import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getBanners } from "@/app/actions";

const CampaignGrid: FC = async () => {
  const { banners } = await getBanners();

  const getImageUrl = (image: string) => {
    if (!image) return "https://via.placeholder.com/500";

    return `${getImageUrlFromPath(
      image
    )}?width=500&height=500&format=wepb&quality=75`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 my-4">
      {banners.map((item, i) => (
        <Link
          href={item.redirect_link}
          className="w-full h-full relative"
          key={item.id}
        >
          <Image
            src={getImageUrl(item.path)}
            width={500}
            height={500}
            className="rounded-lg w-full h-auto"
            alt={item.name}
            priority
            placeholder="blur"
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignGrid;
