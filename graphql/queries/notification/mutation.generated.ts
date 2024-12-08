import * as Types from '../../generated-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreateOrUpdateFcmTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type CreateOrUpdateFcmTokenMutation = { insert_fcm_token?: { affected_rows: number } | null };


export const CreateOrUpdateFcmTokenDocument = gql`
    mutation createOrUpdateFcmToken($token: String!) {
  insert_fcm_token(
    objects: {token: $token, last_used: "now()", platform: "STORE_FRONT"}
    on_conflict: {constraint: fcm_token_token_user_id_key, update_columns: [last_used]}
  ) {
    affected_rows
  }
}
    `;
export type CreateOrUpdateFcmTokenMutationFn = Apollo.MutationFunction<CreateOrUpdateFcmTokenMutation, CreateOrUpdateFcmTokenMutationVariables>;
export type CreateOrUpdateFcmTokenMutationResult = Apollo.MutationResult<CreateOrUpdateFcmTokenMutation>;
export type CreateOrUpdateFcmTokenMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateFcmTokenMutation, CreateOrUpdateFcmTokenMutationVariables>;