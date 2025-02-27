"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useResponsive from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ResponsiveDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  title?: string;
  description?: string | ReactNode;
  className?: string;
  dismissible?: boolean;
}

export function ResponsiveDialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  dismissible = true,
}: ResponsiveDialogProps) {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <Drawer dismissible={dismissible} open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn("fixed inset-x-0 bottom-0 mt-24 px-4", className)}>
          {(title || description) && (
            <DrawerHeader className="text-left">
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
