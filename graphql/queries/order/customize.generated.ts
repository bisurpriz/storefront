import * as Types from "../../generated-types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type UpdateOrderSpecialTextMutationVariables = Types.Exact<{
  id: Types.Scalars["bigint"]["input"];
  content?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type UpdateOrderSpecialTextMutation = {
  update_order_item_special_text_by_pk?: { id: any } | null;
};

export type UpdateOrderSpecialImageMutationVariables = Types.Exact<{
  id: Types.Scalars["bigint"]["input"];
  image_url?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type UpdateOrderSpecialImageMutation = {
  update_order_item_special_image_by_pk?: { id: any } | null;
};

export const UpdateOrderSpecialTextDocument = gql`
  mutation updateOrderSpecialText($id: bigint!, $content: String) {
    update_order_item_special_text_by_pk(
      pk_columns: { id: $id }
      _set: { content: $content }
    ) {
      id
    }
  }
`;
export type UpdateOrderSpecialTextMutationFn = Apollo.MutationFunction<
  UpdateOrderSpecialTextMutation,
  UpdateOrderSpecialTextMutationVariables
>;
export type UpdateOrderSpecialTextMutationResult =
  Apollo.MutationResult<UpdateOrderSpecialTextMutation>;
export type UpdateOrderSpecialTextMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderSpecialTextMutation,
  UpdateOrderSpecialTextMutationVariables
>;
export const UpdateOrderSpecialImageDocument = gql`
  mutation updateOrderSpecialImage($id: bigint!, $image_url: String) {
    update_order_item_special_image_by_pk(
      pk_columns: { id: $id }
      _set: { image_url: $image_url }
    ) {
      id
    }
  }
`;
export type UpdateOrderSpecialImageMutationFn = Apollo.MutationFunction<
  UpdateOrderSpecialImageMutation,
  UpdateOrderSpecialImageMutationVariables
>;
export type UpdateOrderSpecialImageMutationResult =
  Apollo.MutationResult<UpdateOrderSpecialImageMutation>;
export type UpdateOrderSpecialImageMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderSpecialImageMutation,
  UpdateOrderSpecialImageMutationVariables
>;
