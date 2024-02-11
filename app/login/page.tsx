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

const LoginPage = async () => {
  return <LoginForm />
}

export default LoginPage
