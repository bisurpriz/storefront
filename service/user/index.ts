import { GetUserByIdQueryResult } from "@/graphql/queries/account/account.generated";
import { fetch } from "../fetch";

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
  }
}`;

export const getUserById = async (userId) => {
  if (!userId) return null;

  return await fetch<GetUserByIdQueryResult>({
    query: GetUserByIdDocument,
    variables: {
      id: userId,
    },
    tags: ["getUserById"],
  });
};
