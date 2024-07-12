import * as Types from '../../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useLoginMutationMutation() {
  return Urql.useMutation<LoginMutationMutation, LoginMutationMutationVariables>(LoginMutationDocument);
};