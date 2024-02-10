import { User } from '@/common/types/User/user'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import Dropdown from '../Dropdown'
import { profileItems } from './contants'

const HeaderProfile = async () => {
  const user = (await cookies().get('user')) as unknown as User

  return !user ? (
    <div className="flex items-center justify-end ml-2">
      <Link href="/login">
        <Button type="button" size="small" label="Giriş Yap" />
      </Link>
    </div>
  ) : (
    <div className="flex gap-8 items-center justify-end flex-row-reverse ml-2">
      <Dropdown
        dropdownPlacement="bottomRight"
        options={profileItems}
        className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Image
            src={user?.picture || ''}
            width={30}
            height={30}
            alt="User Picture"
            className="rounded-full min-h-[30px] min-w-[30px]"
            loading="lazy"
          />
          <span className="text-sm font-normal text-slate-500 max-lg:hidden">
            {user?.firstname + ' ' + user?.lastname}
          </span>
        </div>
      </Dropdown>
    </div>
  )
}

export default HeaderProfile
