import { FC } from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";
import Image from "next/image";
import Link from "next/link";

const CampaignGrid: FC = () => {
  return (
    <Grid
      cols={12}
      gap={{
        xl: 6,
        lg: 4,
        md: 3,
        sm: 2,
      }}
      className="my-8"
    >
      {Array.from(Array(8).keys()).map((item, i) => (
        <GridItem
          key={i}
          colSpan={{
            xl: 4,
            lg: 6,
            md: 12,
            sm: 12,
          }}
        >
          <Link href={`/campaigns/${i}`}>
            <Image
              src={`/slider/slider-${i}.png`}
              width={500}
              height={500}
              className="rounded-lg w-full h-full"
              alt="Picture of the author"
              priority
            />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CampaignGrid;
