import * as Types from "../../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type ExpiredRefreshTokenMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ExpiredRefreshTokenMutation = {
  refresh_token?: {
    access_token: string;
    body?: any | null;
    error?: string | null;
  } | null;
};

export const ExpiredRefreshTokenDocument = gql`
  mutation expiredRefreshToken {
    refresh_token {
      access_token
      body
      error
    }
  }
`;
export type ExpiredRefreshTokenMutationFn = Apollo.MutationFunction<
  ExpiredRefreshTokenMutation,
  ExpiredRefreshTokenMutationVariables
>;
export type ExpiredRefreshTokenMutationResult =
  Apollo.MutationResult<ExpiredRefreshTokenMutation>;
export type ExpiredRefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  ExpiredRefreshTokenMutation,
  ExpiredRefreshTokenMutationVariables
>;
