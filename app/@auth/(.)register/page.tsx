'use client';

import Modal from '@/components/Modal/FramerModal/Modal';
import { useRouter } from 'next/navigation';
import RegisterForm from './components/RegisterForm';

const ModalRegisterPage = () => {
    const { back } = useRouter()

    return (
        <Modal handleClose={back}>
            <RegisterForm />
        </Modal>
    )
}

export default ModalRegisterPage