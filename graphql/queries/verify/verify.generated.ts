import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type VerifyTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  resend?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type VerifyTokenMutation = { email_verify?: { result?: string | null } | null };


export const VerifyTokenDocument = gql`
    mutation verifyToken($token: String!, $resend: Boolean) {
  email_verify(args: {token: $token, resend: $resend}) {
    result
  }
}
    `;

export function useVerifyTokenMutation() {
  return Urql.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument);
};