import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type GetRatingsQueryVariables = Types.Exact<{
  pid: Types.Scalars["bigint"]["input"];
}>;

export type GetRatingsQuery = {
  get_comment_by_score: Array<{
    score?: number | null;
    comment_count?: number | null;
  }>;
};

export const GetRatingsDocument = gql`
  query getRatings($pid: bigint!) {
    get_comment_by_score(args: { pid: $pid }) {
      score
      comment_count
    }
  }
`;
export type GetRatingsQueryResult = Apollo.QueryResult<
  GetRatingsQuery,
  GetRatingsQueryVariables
>;
