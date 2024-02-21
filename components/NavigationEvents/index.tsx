'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log({
      pathname,
      searchParams: Object.fromEntries(searchParams),
    })
  }, [pathname, searchParams])

  return null
}
