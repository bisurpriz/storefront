import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/common/types/Banners/banners";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface CampaignGridProps {
  banners: Banner[];
}

const CampaignGrid: FC<CampaignGridProps> = ({ banners }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 my-2'>
      {banners.map((item, i) => (
        <Link href={item.redirect_link} className='w-full h-full' key={item.id}>
          <Image
            src={getImageUrlFromPath(item.path)}
            width={500}
            height={500}
            className='rounded-lg w-full h-auto'
            alt={item.name}
            priority
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignGrid;
