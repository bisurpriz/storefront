"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description:
            "group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:hover:bg-primary/90",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:hover:bg-muted/90",
          title: "group-[.toast]:text-base group-[.toast]:font-semibold",
          error:
            "group-[.toast]:bg-destructive/15 group-[.toast]:text-destructive group-[.toast]:border-destructive/20",
          success:
            "group-[.toast]:bg-success/15 group-[.toast]:text-success group-[.toast]:border-success/20",
          warning:
            "group-[.toast]:bg-warning/15 group-[.toast]:text-warning group-[.toast]:border-warning/20",
          info: "group-[.toast]:bg-info/15 group-[.toast]:text-info group-[.toast]:border-info/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
