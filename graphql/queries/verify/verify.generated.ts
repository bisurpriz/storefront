import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;