'use server'

import { User } from '@/common/types/User/user'
import { query } from '@/graphql/lib/client'
import { GET_ALL_BANNERS } from '@/graphql/queries/banners/banners'
import { GET_VENDOR_BY_ID } from '@/graphql/queries/vendors/getVendorById'
import { cookies } from 'next/headers'

// Bu fonksiyon async olduğu için await ile kullanılmalı veya .then ile kullanılmalı
export async function readIdFromCookies() {
  const auth = cookies()

  const id = auth.get('user_id')

  if (!id) null

  return id?.value
}

export async function getIdToken() {
  const token = await cookies().get('access_token')

  if (!token) return new Promise((resolve, reject) => reject('Session is null'))

  return token
}

export async function writeIdToCookies(value: string) {
  const auth = cookies()

  auth.set('user_id', value, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return auth
}

export async function readFingerPrintFromCookies() {
  const auth = cookies()

  const fingerprint = auth.get('fingerPrint')

  if (!fingerprint) null

  return fingerprint?.value
}

export const getVendorById = async <T>({ id }: { id: number }) => {
  const { data, loading } = await query({
    query: GET_VENDOR_BY_ID,
    variables: {
      id,
    },
  })

  return {
    category: {
      name: data.product.category.name,
    },
    product: {
      description: data.product.description,
      id: data.product.id,
      image_url: data.product.image_url,
      name: data.product.name,
      price: data.product.price,
      quantity: data.product.quantity,
    },
    questions: data.product.questions,
    reviews: {
      data: data.product.reviews,
      totalCount: data.product.reviews_aggregate.aggregate.count,
    },
    loading,
  }
}

export async function getBanners() {
  const { data, loading } = await query({
    query: GET_ALL_BANNERS,
  })

  return {
    banners: data.system_banner,
    loading,
  }
}

export async function getUserFromCookies() {
  const cooks = await cookies()

  const user = cooks.get('user')

  if (!user) return null

  return JSON.parse(user.value) as User
}
