import { gql } from '@apollo/client'

export const LOGIN_WITH_EMAIL = gql`
  mutation login($email: String!, $password: String!) {
    login(args: { email: $email, password: $password }) {
      access_token
      refresh_token
      error
    }
  }
`
