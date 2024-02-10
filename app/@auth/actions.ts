'use server'

import { mutate } from '@/graphql/lib/client'
import { LOGIN_WITH_EMAIL } from '@/graphql/queries/auth/login'

export const login = async ({ email, password }) => {
  return mutate({
    mutation: LOGIN_WITH_EMAIL,
    variables: {
      email,
      password,
    },
  })
}
