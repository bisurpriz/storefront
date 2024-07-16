import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrlFromPath } from "@/utils/getImageUrl";
import { getBanners } from "@/app/actions";

const CampaignGrid: FC = async () => {
  const { banners } = await getBanners();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 my-4">
      {banners.map((item, i) => (
        <Link href={item.redirect_link} className="w-full h-full" key={item.id}>
          <Image
            src={getImageUrlFromPath(item.path)}
            width={500}
            height={500}
            className="rounded-lg w-full h-auto"
            alt={item.name}
            priority
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignGrid;
