import React from "react";
import Grid from "../Grid";
import GridItem from "../GridItem";

const CampaignGrid: React.FC = () => {
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
      <GridItem
        colSpan={{
          sm: 6,
        }}
        className="bg-4"
      >
        <div className="p-12">Ali baba</div>
      </GridItem>
      <GridItem
        colSpan={{
          sm: 6,
        }}
        className="bg-4"
      >
        <div className="p-12">Ali baba</div>
      </GridItem>
      <GridItem
        colSpan={{
          sm: 6,
        }}
        className="bg-4"
      >
        <div className="p-12">Ali baba</div>
      </GridItem>
    </Grid>
  );
};

export default CampaignGrid;
