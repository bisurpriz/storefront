import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query getUserById($id: uuid = "") {
    user_by_pk(id: $id) {
      created_at
      email
      firstname
      lastname
      picture
      phone
      reference_code
      vkn_tckn
    }
  }
`;

export const UPDATE_USER_BY_ID = gql`
  mutation updateUserById(
    $id: uuid!
    $firstname: String
    $lastname: String
    $phone: String
    $picture: String
    $vkn_tckn: String
  ) {
    update_user_by_pk(
      pk_columns: { id: $id }
      _set: {
        firstname: $firstname
        lastname: $lastname
        phone: $phone
        picture: $picture
        vkn_tckn: $vkn_tckn
      }
    ) {
      email
      firstname
      lastname
      phone
      picture
      vkn_tckn
    }
  }
`;
