'use client';

import { logout } from '@/app/@auth/actions';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {

    const { refresh } = useRouter()

    return (
        <span
            className="block p-4 text-sm font-normal text-gray-500 hover:bg-gray-50 whitespace-normal"
            onClick={async () => {
                await logout()
                refresh()
            }}
        >
            Çıkış Yap
        </span>
    )
}

export default LogoutButton