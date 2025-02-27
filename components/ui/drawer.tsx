"use client";

import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";
import {
  ComponentProps,
  ComponentPropsWithRef,
  FC,
  HTMLAttributes,
  useEffect,
} from "react";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay: FC<
  ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>
> = ({ className, ref, ...props }) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent: FC<
  ComponentPropsWithRef<typeof DrawerPrimitive.Content>
> = ({ className, children, ref, ...props }) => {
  useEffect(() => {
    const handleKeyboardShow = () => {
      const content = document.querySelector('[data-vaul-drawer-content]');
      if (content) {
        content.setAttribute('style', 'position: absolute; bottom: 0; transform: none;');
      }
    };

    const handleKeyboardHide = () => {
      const content = document.querySelector('[data-vaul-drawer-content]');
      if (content) {
        content.removeAttribute('style');
      }
    };

    // For iOS
    window.addEventListener('focusin', handleKeyboardShow);
    window.addEventListener('focusout', handleKeyboardHide);

    // For Android
    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        if (window.visualViewport!.height < window.innerHeight) {
          handleKeyboardShow();
        } else {
          handleKeyboardHide();
        }
      });
    }

    return () => {
      window.removeEventListener('focusin', handleKeyboardShow);
      window.removeEventListener('focusout', handleKeyboardHide);
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', () => {});
      }
    };
  }, []);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
};

DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle: FC<ComponentPropsWithRef<typeof DrawerPrimitive.Title>> = ({
  className,
  ref,
  ...props
}) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: FC<
  ComponentPropsWithRef<typeof DrawerPrimitive.Description>
> = ({ className, ref, ...props }) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
