'use client'

import Button from '@/components/Button'
import TextField from '@/components/TextField'
import Image from 'next/image'
import Link from 'next/link'

const RegisterForm = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-[500px] rounded-lg p-12 m-auto gap-4 font-mono">
      <div className="w-full max-w-[400px] mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <Image
            src="/logo.svg"
            width={300}
            height={300}
            alt="Login"
            className="m-auto"
          />
          <h1 className="text-3xl font-bold text-center">Giriş Yap</h1>
          <p className="text-center text-gray-500">
            Sipariş verebilmek, kampanyalardan faydalanabilmek ve daha fazlası
            için giriş yapın.
          </p>
        </div>
        <div className="space-y-4">
          <TextField
            autoComplete="off"
            id="firstname"
            label="Adınız"
            placeholder="Adınız"
            fullWidth
          />
          <TextField
            autoComplete="off"
            id="lastname"
            label="Soyadınız"
            placeholder="Soyadınız"
            fullWidth
          />
          <TextField
            autoComplete="off"
            id="email"
            label="Email"
            type="email"
            placeholder="Mail adresiniz"
            fullWidth
          />
          <TextField
            autoComplete="off"
            id="password"
            label="Şifre"
            type="password"
            placeholder="Şifre"
            fullWidth
          />
          <Button className="m-auto">Kayıt Ol</Button>
        </div>
        <div>
          <p className="text-center text-gray-500">
            Hesabınız var mı?{' '}
            <Link href="/login" className="text-blue-500" replace>
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
