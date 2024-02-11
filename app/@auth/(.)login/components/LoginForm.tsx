'use client'

import Button from '@/components/Button'
import TextField from '@/components/TextField'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { IoLogIn } from 'react-icons/io5'
import { login } from '../../actions'
import { AuthErrorMessages } from '../../contants'

const LoginForm: FC = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { back } = useRouter()

  const handleClientLogin = async (event:
    React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setLoading(true)
    const [email, password] = Array.from(event.currentTarget.elements).map(
      (field: HTMLInputElement) => field.value
    )

    const response = await login({ email, password })

    if (response.data.login.error) {
      const errorMessage =
        AuthErrorMessages[
        response.data.login.error as keyof typeof AuthErrorMessages
        ]

      setError(errorMessage)
      toast.error(errorMessage, {
        position: 'bottom-right',
        ariaProps: {
          "aria-live": "polite",
          role: "status"
        },
        id: 'login-error',
        duration: 1500
      })
      setLoading(false)
      return
    }

    setError('')
    toast.success('Giriş başarılı', {
      position: 'bottom-right',
      ariaProps: {
        "aria-live": "polite",
        role: "status"
      },
      id: 'login-success',
      duration: 1500,
    })

    setLoading(false)
    back()
  }

  return (
    <div>
      <form onSubmit={handleClientLogin}>
        <div className="flex flex-col items-center justify-center bg-white w-[500px] rounded-lg p-12 m-auto gap-4 font-mono">
          <Image src="/logo.svg" width={300} height={300} alt="Login" />
          <h1 className="text-3xl font-bold text-center">Giriş Yap</h1>
          <p className="text-center text-gray-500">
            Sipariş verebilmek, kampanyalardan faydalanabilmek ve daha fazlası için giriş yapın.
          </p>
          <div className='w-full flex flex-col gap-2'>
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
          </div>
          <Button type='submit' icon={<IoLogIn className="mr-2" />} label="Giriş Yap" loading={loading} />
          <p className='flex gap-2'>
            Hesabınız yok mu?
            <Link href="/register" className="text-center text-blue-500" replace>
              Kayıt olun
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
