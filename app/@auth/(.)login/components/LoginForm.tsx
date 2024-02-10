'use client'

import { LoginResponse } from '@/app/login/page'
import SubmitButton from '@/components/Button/SubmitButton'
import TextField from '@/components/TextField'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { IoLogIn } from 'react-icons/io5'
import { login } from '../../actions'
import { AuthErrorMessages } from '../../contants'

const LoginForm: FC = () => {
  const [error, setError] = useState('')

  const handleLogin = async (data: FormData) => {
    const [email, password] = [data.get('email'), data.get('password')]

    return (await login({ email, password })) as LoginResponse
  }

  const handleClientLogin = async (data: FormData) => {
    const response = await handleLogin(data)

    if (response.data.login.error) {
      const errorMessage =
        AuthErrorMessages[
          response.data.login.error as keyof typeof AuthErrorMessages
        ]

      setError(errorMessage)
      toast.error(errorMessage)
    } else {
      setError('')
      toast.success('Giriş başarılı')
    }
  }

  return (
    <form action={handleClientLogin}>
      <div className="flex flex-col items-center justify-center bg-gray-200 w-[500px] rounded-lg p-12 m-auto gap-2">
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="Lütfen email adresinizi girin"
          fullWidth
          error={!!error}
        />
        <TextField
          id="password"
          label="Şifre"
          type="password"
          placeholder="Lütfen şifrenizi girin"
          fullWidth
          error={!!error}
        />
        {error && <p className="text-red-500 mr-auto text-sm">{error}</p>}
        <SubmitButton icon={<IoLogIn className="mr-2" />} label="Giriş Yap" />
      </div>
    </form>
  )
}

export default LoginForm
