'use server'

import { LoginMutationDocument } from '@/graphql/generated';
import { mutate, } from '@/graphql/lib/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const login = async ({ email, password }) => {
  const response = await mutate({
    mutation: LoginMutationDocument,
    variables: {
      email,
      password,
    },
  })

  if (response.data.login.access_token && response.data.login.refresh_token) {
    const decodedToken = await jwt.decode(response.data.login.access_token)
    const user = {
      id: decodedToken['https://hasura.io/jwt/claims']['x-hasura-user-id'],
    }

    console.log(decodedToken)


    cookies().set('access_token', response.data.login.access_token)
    cookies().set('refresh_token', response.data.login.refresh_token)
    cookies().set('user_id', user.id)
  }

  return response
}

export const logout = async () => {
  cookies().delete('access_token')
  cookies().delete('refresh_token')
  cookies().delete('user_id')

  return true
}
