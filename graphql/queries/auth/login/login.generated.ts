import * as Types from '../../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type LoginMutationMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']['input']>;
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type LoginMutationMutation = { login?: { access_token?: string | null, refresh_token?: string | null, error?: string | null } | null };


export const LoginMutationDocument = gql`
    mutation loginMutation($email: String, $password: String) {
  login(args: {email: $email, password: $password}) {
    access_token
    refresh_token
    error
  }
}
    `;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;