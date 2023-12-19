import { gql } from "@apollo/client";

const GET_USER_ADDRESSES = gql`
  query getUserAddresses {
    user_address {
      address_title
      address
      id
      city {
        name
        id
      }
      quarter {
        name
        id
      }
      district {
        name
        id
      }
    }
  }
`;

export { GET_USER_ADDRESSES };
