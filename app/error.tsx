'use client' 
 
import ErrorComponent from '@/components/ErrorComponent'
 
export default function Error({
  error,
  reset,
}: {error: Error & { digest?: string }, reset: () => void }) {
    return <ErrorComponent error={error} reset={reset} />
}