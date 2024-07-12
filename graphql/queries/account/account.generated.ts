import * as Types from '../../generated-types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserAddressByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['uuid']['input']>;
}>;


export type GetUserAddressByIdQuery = { user_by_pk?: { user_addresses: Array<{ address: string, address_title: string, receiver_firstname: string, receiver_phone: string, receiver_surname: string, id: number, city: { id: number, name: string }, district: { id: number, name: string }, quarter: { id: number, name: string } }> } | null };

export type GetUserByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['uuid']['input']>;
}>;


export type GetUserByIdQuery = { user_by_pk?: { id: any, created_at?: any | null, email?: string | null, firstname?: string | null, lastname?: string | null, picture?: string | null, phone?: string | null, reference_code?: string | null, user_addresses: Array<{ address_title: string, address: string }>, carts: Array<{ id: any, content?: any | null }> } | null };

export type UpdateUserByIdMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  firstname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  lastname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
  picture?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateUserByIdMutation = { update_user_by_pk?: { email?: string | null, firstname?: string | null, lastname?: string | null, phone?: string | null, picture?: string | null } | null };

export type GetCitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { cities: Array<{ code: number, id: number, name: string }> };

export type GetDistrictsQueryVariables = Types.Exact<{
  cityId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetDistrictsQuery = { districts: Array<{ name: string, id: number }> };

export type GetQuartersQueryVariables = Types.Exact<{
  districtId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetQuartersQuery = { quarters: Array<{ name: string, id: number }> };

export type GetQuarterByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetQuarterByIdQuery = { quarter: Array<{ code: number, id: number, name: string, district: { id: number, code: number, name: string, city: { code: number, id: number, name: string } } }> };

export type GetDistrictByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetDistrictByIdQuery = { district: Array<{ code: number, id: number, name: string, city: { name: string, id: number } }> };

export type GetCityByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCityByIdQuery = { city: Array<{ code: number, id: number, name: string }> };

export type GetUserOrdersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserOrdersQuery = { order: Array<{ created_at: any, id: any, total_amount: number, tenant_orders: Array<{ id: any, tenant: { id: any, tenants: Array<{ name?: string | null, logo?: string | null, id: any }> }, order_items: Array<{ id: any, order_item_no?: string | null, product_id: any, quantity: number, product: { id: any, slug?: string | null, description?: string | null, image_url?: Array<string> | null, name: string, price: number, discount_price?: number | null, quantity?: number | null, category: { name: string, slug?: string | null }, product_customizable_areas: Array<{ count: number, max_character?: number | null, customizable_area: { id: number, type: string } }> } }>, order_status?: { value: string } | null }> }> };

export type CreateNewAddressMutationVariables = Types.Exact<{
  address?: Types.InputMaybe<Types.Scalars['String']['input']>;
  address_title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  city_id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  district_id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  quarter_id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  receiver_firstname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  receiver_phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
  receiver_surname?: Types.InputMaybe<Types.Scalars['String']['input']>;
  user_id?: Types.InputMaybe<Types.Scalars['uuid']['input']>;
}>;


export type CreateNewAddressMutation = { insert_user_address_one?: { address_title: string, id: number } | null };

export type GetUserByEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { user: Array<{ id: any, provider_id?: string | null }> };

export type GetLocationQueryQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetLocationQueryQuery = { search_locationv1: Array<{ id?: number | null, name?: string | null, type?: string | null, district_id?: number | null, district_name?: string | null, city_id?: number | null, city_name?: string | null }> };


export const GetUserAddressByIdDocument = gql`
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

export function useGetUserAddressByIdQuery(options?: Omit<Urql.UseQueryArgs<GetUserAddressByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserAddressByIdQuery, GetUserAddressByIdQueryVariables>({ query: GetUserAddressByIdDocument, ...options });
};
export const GetUserByIdDocument = gql`
    query getUserById($id: uuid = "") {
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
}
    `;

export function useGetUserByIdQuery(options?: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>({ query: GetUserByIdDocument, ...options });
};
export const UpdateUserByIdDocument = gql`
    mutation updateUserById($id: uuid!, $firstname: String, $lastname: String, $phone: String, $picture: String) {
  update_user_by_pk(
    pk_columns: {id: $id}
    _set: {firstname: $firstname, lastname: $lastname, phone: $phone, picture: $picture}
  ) {
    email
    firstname
    lastname
    phone
    picture
  }
}
    `;

export function useUpdateUserByIdMutation() {
  return Urql.useMutation<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>(UpdateUserByIdDocument);
};
export const GetCitiesDocument = gql`
    query getCities {
  cities: city {
    code
    id
    name
  }
}
    `;

export function useGetCitiesQuery(options?: Omit<Urql.UseQueryArgs<GetCitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCitiesQuery, GetCitiesQueryVariables>({ query: GetCitiesDocument, ...options });
};
export const GetDistrictsDocument = gql`
    query getDistricts($cityId: Int = 10) {
  districts: district(where: {city: {id: {_eq: $cityId}}}) {
    name
    id
  }
}
    `;

export function useGetDistrictsQuery(options?: Omit<Urql.UseQueryArgs<GetDistrictsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDistrictsQuery, GetDistrictsQueryVariables>({ query: GetDistrictsDocument, ...options });
};
export const GetQuartersDocument = gql`
    query getQuarters($districtId: Int = 1) {
  quarters: quarter(where: {district: {id: {_eq: $districtId}}}) {
    name
    id
  }
}
    `;

export function useGetQuartersQuery(options?: Omit<Urql.UseQueryArgs<GetQuartersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetQuartersQuery, GetQuartersQueryVariables>({ query: GetQuartersDocument, ...options });
};
export const GetQuarterByIdDocument = gql`
    query GetQuarterById($id: Int) @cached {
  quarter(where: {id: {_eq: $id}}) {
    code
    id
    name
    district {
      id
      code
      name
      city {
        code
        id
        name
      }
    }
  }
}
    `;

export function useGetQuarterByIdQuery(options?: Omit<Urql.UseQueryArgs<GetQuarterByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetQuarterByIdQuery, GetQuarterByIdQueryVariables>({ query: GetQuarterByIdDocument, ...options });
};
export const GetDistrictByIdDocument = gql`
    query getDistrictById($id: Int) @cached {
  district(where: {id: {_eq: $id}}) {
    code
    id
    name
    city {
      name
      id
    }
  }
}
    `;

export function useGetDistrictByIdQuery(options?: Omit<Urql.UseQueryArgs<GetDistrictByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDistrictByIdQuery, GetDistrictByIdQueryVariables>({ query: GetDistrictByIdDocument, ...options });
};
export const GetCityByIdDocument = gql`
    query getCityById($id: Int) {
  city(where: {id: {_eq: $id}}) {
    code
    id
    name
  }
}
    `;

export function useGetCityByIdQuery(options?: Omit<Urql.UseQueryArgs<GetCityByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCityByIdQuery, GetCityByIdQueryVariables>({ query: GetCityByIdDocument, ...options });
};
export const GetUserOrdersDocument = gql`
    query getUserOrders {
  order {
    created_at
    id
    total_amount
    tenant_orders {
      id
      tenant {
        id
        tenants {
          name
          logo
          id
        }
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
          product_customizable_areas {
            count
            max_character
            customizable_area {
              id
              type
            }
          }
        }
      }
      order_status {
        value
      }
    }
  }
}
    `;

export function useGetUserOrdersQuery(options?: Omit<Urql.UseQueryArgs<GetUserOrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserOrdersQuery, GetUserOrdersQueryVariables>({ query: GetUserOrdersDocument, ...options });
};
export const CreateNewAddressDocument = gql`
    mutation createNewAddress($address: String, $address_title: String, $city_id: Int, $district_id: Int, $quarter_id: Int, $receiver_firstname: String, $receiver_phone: String, $receiver_surname: String, $user_id: uuid) {
  insert_user_address_one(
    object: {address: $address, address_title: $address_title, city_id: $city_id, district_id: $district_id, quarter_id: $quarter_id, receiver_firstname: $receiver_firstname, receiver_phone: $receiver_phone, receiver_surname: $receiver_surname, user_id: $user_id}
  ) {
    address_title
    id
  }
}
    `;

export function useCreateNewAddressMutation() {
  return Urql.useMutation<CreateNewAddressMutation, CreateNewAddressMutationVariables>(CreateNewAddressDocument);
};
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!) {
  user(where: {email: {_eq: $email}}) {
    id
    provider_id
  }
}
    `;

export function useGetUserByEmailQuery(options: Omit<Urql.UseQueryArgs<GetUserByEmailQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>({ query: GetUserByEmailDocument, ...options });
};
export const GetLocationQueryDocument = gql`
    query GetLocationQuery($search: String = "") @cached {
  search_locationv1(args: {search: $search}, limit: 100) {
    id
    name
    type
    district_id
    district_name
    city_id
    city_name
  }
}
    `;

export function useGetLocationQueryQuery(options?: Omit<Urql.UseQueryArgs<GetLocationQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<GetLocationQueryQuery, GetLocationQueryQueryVariables>({ query: GetLocationQueryDocument, ...options });
};