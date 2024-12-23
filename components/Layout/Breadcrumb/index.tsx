"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import useResponsive from "@/hooks/useResponsive";
import JsonLd from "@/lib/JsonLd";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ITEMS_TO_DISPLAY = 3;

function BreadcrumbResponsive() {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useResponsive();
  const { breadcrumbs: items } = useBreadcrumb();
  const pathname = usePathname();

  if (pathname === "/") return null;

  if (!items.length) return null;

  const breadcrumbListData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <Breadcrumb className="mb-4">
      <JsonLd data={breadcrumbListData} />
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={"/"}>Anasayfa</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {!isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(0, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        {item.href ? (
                          <Link href={item.href}>{item.label}</Link>
                        ) : (
                          item.label
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -2).map((item, index) =>
                        item.href ? (
                          <Link
                            key={index}
                            href={item.href}
                            className="py-1 text-sm"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span key={index} className="py-1 text-sm">
                            {item.label}
                          </span>
                        ),
                      )}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <>
                <BreadcrumbLink
                  className="max-w-30 truncate md:max-w-none"
                  href={item.href}
                >
                  {item.label}
                </BreadcrumbLink>
                {index !== items.slice(-ITEMS_TO_DISPLAY + 1).length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </>
            ) : (
              <BreadcrumbPage className="max-w-30 truncate md:max-w-none">
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default dynamic(() => Promise.resolve(BreadcrumbResponsive), {
  ssr: false,
  loading: () => (
    <div className="mb-4 h-5 w-full animate-pulse rounded-md bg-slate-200" />
  ),
});
