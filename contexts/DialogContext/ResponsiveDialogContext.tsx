"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useResponsive from "@/hooks/useResponsive";

interface ResponsiveDialogContextType {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
}

export const ResponsiveDialogContext = createContext<
  ResponsiveDialogContextType | undefined
>(undefined);

export const ResponsiveDialogProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const { isDesktop } = useResponsive();

  const openDialog = (content: ReactNode) => {
    setContent(content);
    setOpen(true);
  };

  const closeDialog = () => {
    setContent(null);
    setOpen(false);
    return true;
  };

  const Component: FC<{
    open: boolean;
    onClose: () => void;
    children: ReactNode;
  }> = () =>
    !isDesktop ? (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    ) : (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>{content}</DrawerContent>
      </Drawer>
    );

  const values = useMemo(
    () => ({ openDialog, closeDialog }),
    [openDialog, closeDialog],
  );

  return (
    <ResponsiveDialogContext.Provider value={values}>
      {children}
      <Component open={open} onClose={closeDialog}>
        {content}
      </Component>
    </ResponsiveDialogContext.Provider>
  );
};

export const useResponsiveDialog = () => {
  const context = useContext(ResponsiveDialogContext);
  if (context === undefined) {
    throw new Error(
      "useResponsiveDialog must be used within a ResponsiveDialogProvider",
    );
  }
  return context;
};
