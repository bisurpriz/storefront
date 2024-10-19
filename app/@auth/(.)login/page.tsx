"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import useResponsive from "@/hooks/useResponsive";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const ModalLoginPage = () => {
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
        <LoginForm
          onSuccessfulLogin={(status) => {
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
        <LoginForm
          onSuccessfulLogin={(status) => {
            if (status) {
              back();
            }
          }}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ModalLoginPage;
