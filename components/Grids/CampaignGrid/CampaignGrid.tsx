import { FC } from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";

const CampaignGrid: FC = () => {
  return (
    <Grid
      cols={12}
      gap={{
        xl: 5,
        lg: 4,
        md: 3,
        sm: 2,
      }}
    >
      <GridItem className="bg-4">
        <div className="p-12">Ali baba</div>
      </GridItem>
      <GridItem className="bg-4">
        <div className="p-12">Ali baba</div>
      </GridItem>
      <GridItem className="bg-4">
        <div className="p-12">Ali baba</div>
      </GridItem>
    </Grid>
  );
};

export default CampaignGrid;
