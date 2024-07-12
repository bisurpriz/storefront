import * as Types from '../../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ExpiredRefreshTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ExpiredRefreshTokenMutation = { refresh_token?: { access_token: string, body?: any | null, error?: string | null } | null };


export const ExpiredRefreshTokenDocument = gql`
    mutation expiredRefreshToken {
  refresh_token {
    access_token
    body
    error
  }
}
    `;

export function useExpiredRefreshTokenMutation() {
  return Urql.useMutation<ExpiredRefreshTokenMutation, ExpiredRefreshTokenMutationVariables>(ExpiredRefreshTokenDocument);
};