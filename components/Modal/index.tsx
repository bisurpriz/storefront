"use client";

import { useState, useEffect, ReactNode } from "react";
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
    if (closeOnBackdropClick) {
      handleClose?.();
    }
  };

  if (isDesktop) {
    return (
      <Drawer open={open} onOpenChange={handleBackdropClick}>
        <DrawerContent>
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
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="p-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
