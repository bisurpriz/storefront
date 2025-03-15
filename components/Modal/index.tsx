"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useResponsive from "@/hooks/useResponsive";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  handleClose?: () => void;
  title?: string;
  children: ReactNode;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  open,
  handleClose,
  title,
  children,
  closeOnBackdropClick = true,
}: ModalProps) {
  const { isDesktop } = useResponsive();

  const handleBackdropClick = () => {
    handleClose?.();
  };

  if (isDesktop) {
    return (
      <Drawer open={open} onOpenChange={handleBackdropClick}>
        <DrawerContent
          onPointerDownOutside={(e) => {
            e.preventDefault();
            if (closeOnBackdropClick) {
              handleBackdropClick();
            }
          }}
        >
          {title && (
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
          )}
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleBackdropClick}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
          if (closeOnBackdropClick) {
            handleBackdropClick();
          }
        }}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
