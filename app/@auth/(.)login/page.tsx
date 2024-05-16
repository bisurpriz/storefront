"use client";

import Modal from "@/components/Modal/FramerModal/Modal";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";

const ModalLoginPage = () => {
  const { back } = useRouter();

  return (
    <Modal handleClose={back} open>
      <LoginForm
        onSuccessfulLogin={(status) => {
          if (status) {
            back();
          }
        }}
      />
    </Modal>
  );
};

export default ModalLoginPage;
