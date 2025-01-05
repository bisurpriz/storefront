import { GetUserByIdQuery } from "@/graphql/queries/account/account.generated";
import { BonnmarseApi } from "../fetch";

export const GetUserByIdDocument = `query getUserById($id: uuid = "") {
  user_by_pk(id: $id) {
    id
    created_at
    email
    firstname
    lastname
    picture
    phone
    reference_code
    user_addresses {
      address_title
      address
    }
    carts {
      id
      content
    }
    favorites {
      product_id
    }
  }
}`;

export const GetUserByEmailDocument = `
    query getUserByEmail($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    provider_id
  }
}
    `;

export const RegisterDocument = `
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

export const UpdateUserByIdDocument = `
  mutation updateUserById(
    $id: uuid!
    $firstname: String
    $lastname: String
    $phone: String
    $picture: String
  ) {
    update_user_by_pk(
      pk_columns: { id: $id }
      _set: {
        firstname: $firstname
        lastname: $lastname
        phone: $phone
        picture: $picture
      }
    ) {
      email
      firstname
      lastname
      phone
      picture
    }
  }
`;

export const GetUserAddressesDocument = `
  query getUserAddresses($user_id: uuid!) {
    user_address(where: { user_id: { _eq: $user_id } }) {
      address_title
      address
      id
      city 
      quarter
      district
      place_id
    }
  }
`;

export const getUserById = async (userId) => {
  if (!userId) return null;
  return await BonnmarseApi.request<GetUserByIdQuery>({
    query: GetUserByIdDocument,
    variables: {
      id: userId,
    },
    tags: ["getUserById"],
    cache: {
      enable: true,
      duration: 30 * 60 * 1000,
    },
    withAuth: true,
  });
};
