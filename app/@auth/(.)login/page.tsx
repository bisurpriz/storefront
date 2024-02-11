'use client'

import Modal from '@/components/Modal/FramerModal/Modal'
import { useRouter } from 'next/navigation'
import LoginForm from './components/LoginForm'

const ModalLoginPage = () => {
  const { back } = useRouter()

  return (
    <Modal handleClose={back}>
      <LoginForm />
    </Modal>
  )
}

export default ModalLoginPage
