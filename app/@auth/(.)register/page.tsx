"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "./components/RegisterForm";
import useResponsive from "@/hooks/useResponsive";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const ModalRegisterPage = () => {
  const { isDesktop } = useResponsive();
  const { back } = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      back();
    }
  };

  return !isDesktop ? (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        <RegisterForm
          onSuccessfulRegister={(status) => {
            if (status) {
              back();
            }
          }}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={true} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <RegisterForm
          onSuccessfulRegister={(status) => {
            if (status) {
              back();
            }
          }}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ModalRegisterPage;
