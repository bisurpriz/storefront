'use client';

import LoginForm from '../@auth/(.)login/components/LoginForm'

export type LoginResponse = {
  data: {
    login: {
      error: string
      refresh_token: string | null
      access_token: string | null
    }
  }
}

const LoginPage = () => {
  return (
    <LoginForm
      onSuccessfulLogin={(status) => {
        if (status) {
          console.log('login successful')
        }
      }}
    />
  )
}

export default LoginPage
