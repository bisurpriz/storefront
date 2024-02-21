'use client'
import { ApolloWrapper } from '@/graphql/lib/apollo-wrapper'
import useChatStore from '@/store'
import { useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { getUserById } from '../../actions'
import { SubscribeToChatsDocument } from '@/graphql/generated'

export const dynamic = 'force-dynamic'

const SocketListener = () => {
  const { setChats } = useChatStore((state) => state)

  const { error } = useSubscription(SubscribeToChatsDocument, {
    onData(options: any) {
      setChats(options?.data?.data?.chat_thread)
    },
  })

  if (error) {
    console.log(error)
  }

  return <div></div>
}

const Listener = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { user } = await getUserById()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return null
  return (
    <ApolloWrapper>
      <SocketListener />
    </ApolloWrapper>
  )
}

export default Listener
