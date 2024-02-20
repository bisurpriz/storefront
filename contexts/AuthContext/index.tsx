'use client'

import { ReactNode, createContext, useContext, useMemo } from 'react'

type AuthUser = {
    created_at?: any;
    email: string;
    firstname?: string;
    lastname?: string;
    picture?: string;
    phone: string;
    reference_code?: string;
    user_addresses: {
        address_title: string;
        address: string;
    }[];
}

interface AuthContextType {
    user: AuthUser | null
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
})

export const AuthProvider = ({
    children,
    user,
}: {
    children: ReactNode
    user: AuthUser
}) => {
    const memoized = useMemo(() => ({ user }), [user])

    return (
        <AuthContext.Provider value={memoized}>{children}</AuthContext.Provider>
    )
}

export const useUser = () => useContext(AuthContext)
