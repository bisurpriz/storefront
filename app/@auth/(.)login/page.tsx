"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";

const TEXT = {
  title: "Giriş Yap",
  description:
    "Hesabınıza giriş yapmak için e-posta ve şifrenizi kullanın veya Google ile giriş yapın",
} as const;

const ModalLoginPage = () => {
  const { isDesktop } = useResponsive();
  const { back } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.style.overflow = "hidden";
      setOpen(true);
    });

    return () => {
      document.body.style.overflow = "unset";
      setOpen(false);
    };
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !document.body.classList.contains("pointer-events-none")) {
        back();
      }
    },
    [back],
  );

  const handleSuccessfulLogin = useCallback(
    (status: boolean) => {
      if (status) {
        back();
      }
    },
    [back],
  );

  const handleOutsideInteraction = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const modalContent = <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />;

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          onPointerDownOutside={handleOutsideInteraction}
          onInteractOutside={handleOutsideInteraction}
        >
          <DialogTitle className="sr-only">{TEXT.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {TEXT.description}
          </DialogDescription>
          {modalContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerContent>
        <DrawerTitle className="sr-only">{TEXT.title}</DrawerTitle>
        <DrawerDescription className="sr-only">
          {TEXT.description}
        </DrawerDescription>
        {modalContent}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalLoginPage;
