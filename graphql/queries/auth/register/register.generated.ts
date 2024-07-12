import * as Types from '../../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RegisterMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password?: Types.InputMaybe<Types.Scalars['String']['input']>;
  firstname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  lastname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  provider?: Types.InputMaybe<Types.Scalars['String']['input']>;
  picture?: Types.InputMaybe<Types.Scalars['String']['input']>;
  provider_id?: Types.InputMaybe<Types.Scalars['String']['input']>;
  phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RegisterMutation = { register?: { data?: any | null, body?: any | null, error?: string | null } | null };


export const RegisterDocument = gql`
    mutation register($email: String!, $password: String, $firstname: String, $lastname: String, $provider: String, $picture: String, $provider_id: String, $phone: String) {
  register(
    args: {email: $email, password: $password, firstname: $firstname, lastname: $lastname, provider: $provider, picture: $picture, provider_id: $provider_id, phone: $phone}
  ) {
    data
    body
    error
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};