import * as Types from '../../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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


export type RegisterMutation = { register?: { data?: any | null, success?: boolean | null, message?: string | null } | null };


export const RegisterDocument = gql`
    mutation register($email: String!, $password: String, $firstname: String, $lastname: String, $provider: String, $picture: String, $provider_id: String, $phone: String) {
  register(
    args: {email: $email, password: $password, firstname: $firstname, lastname: $lastname, provider: $provider, picture: $picture, provider_id: $provider_id, phone: $phone}
  ) {
    data
    success
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;