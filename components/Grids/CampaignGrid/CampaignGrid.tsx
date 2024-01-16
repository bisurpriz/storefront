import { FC } from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";
import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/common/types/Banners/banners";
import { getImageUrlFromPath } from "@/utils/getImageUrl";

interface CampaignGridProps {
  banners: Banner[];
}

const CampaignGrid: FC<CampaignGridProps> = ({
  banners
}) => {
  return (
    <Grid
      cols={12}
      gap={{
        xl: 6,
        lg: 4,
        md: 3,
        sm: 2,
      }}
      className='my-8'
    >
      {banners.map((item, i) => (
        <GridItem
          key={i}
          colSpan={{
            xl: 4,
            lg: 6,
            md: 12,
            sm: 12,
          }}
        >
          <Link href={item.redirect_link}>
            <Image
              src={getImageUrlFromPath(item.path)}
              width={500}
              height={500}
              className='rounded-lg w-auto h-full'
              alt={item.name}
              priority
            />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CampaignGrid;
