import { gql } from "@apollo/client";

export const GET_USER_ADDRESS_BY_ID = gql`
  query getUserAddressById($id: uuid = "") {
    user_by_pk(id: $id) {
      user_addresses {
        address
        address_title
        receiver_firstname
        receiver_phone
        receiver_surname
        id
        city {
          id
          name
        }
        district {
          id
          name
        }
        quarter {
          id
          name
        }
      }
    }
  }
`;

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
      user_addresses {
        address_title
        address
      }
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

export const GET_CITIES = gql`
  query getCities {
    cities: city {
      code
      id
      name
    }
  }
`;

export const GET_DISTRICTS = gql`
  query getDistricts($cityId: Int = 10) {
    districts: district(where: { city: { id: { _eq: $cityId } } }) {
      name
      id
    }
  }
`;

export const GET_QUARTERS = gql`
  query getQuarters($districtId: Int = 1) {
    quarters: quarter(where: { district: { id: { _eq: $districtId } } }) {
      name
      id
    }
  }
`;

export const GET_USER_ORDERS = gql`
  query getUserOrders {
    order {
      created_at
      id
      total_amount
      tenant_orders {
        id
        tenant {
          nickname
          id
        }
        order_items {
          id
          order_item_no
          product_id
          quantity
          product {
            category {
              name
              slug
            }
            id
            slug
            description
            image_url
            name
            price
            discount_price
            quantity
          }
        }
        order_status {
          value
        }
      }
    }
  }
`;

export const CREATE_NEW_ADDRESS = gql`
  mutation createNewAddress(
    $address: String
    $address_title: String
    $city_id: Int
    $district_id: Int
    $quarter_id: Int
    $receiver_firstname: String
    $receiver_phone: String
    $receiver_surname: String
    $user_id: uuid
  ) {
    insert_user_address_one(
      object: {
        address: $address
        address_title: $address_title
        city_id: $city_id
        district_id: $district_id
        quarter_id: $quarter_id
        receiver_firstname: $receiver_firstname
        receiver_phone: $receiver_phone
        receiver_surname: $receiver_surname
        user_id: $user_id
      }
    ) {
      address_title
      id
    }
  }
`;
