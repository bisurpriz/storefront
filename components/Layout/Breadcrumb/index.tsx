"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BreadcrumbItem as BaseBreadcrumbItem,
  Breadcrumb,
  BreadcrumbEllipsis,
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
import { Skeleton } from "@/components/ui/skeleton";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import useResponsive from "@/hooks/useResponsive";
import JsonLd from "@/lib/JsonLd";
import dynamic from "next/dynamic";

const ITEMS_TO_DISPLAY = 3;

interface BreadcrumbItemType {
  href?: string;
  label: string;
}

function BreadcrumbDropdown({
  items,
  open,
  setOpen,
}: {
  items: BreadcrumbItemType[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="flex items-center gap-1"
        aria-label="Toggle menu"
      >
        <BreadcrumbEllipsis className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.slice(0, -2).map((item, index) => (
          <DropdownMenuItem key={item.href || index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BreadcrumbDrawer({
  items,
  open,
  setOpen,
}: {
  items: BreadcrumbItemType[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger aria-label="Toggle Menu">
        <BreadcrumbEllipsis className="h-4 w-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Navigate to</DrawerTitle>
          <DrawerDescription>Select a page to navigate to.</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-1 px-4">
          {items.slice(1, -2).map((item, index) =>
            item.href ? (
              <Link
                key={item.href || index}
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
  );
}

function CustomBreadcrumbItem({
  item,
  isLast,
}: {
  item: BreadcrumbItemType;
  isLast: boolean;
}) {
  return (
    <BaseBreadcrumbItem>
      {item.href ? (
        <>
          <BreadcrumbLink
            className="max-w-30 truncate md:max-w-none"
            href={item.href}
          >
            {item.label}
          </BreadcrumbLink>
          {!isLast && <BreadcrumbSeparator />}
        </>
      ) : (
        <BreadcrumbPage className="max-w-30 truncate md:max-w-none">
          {item.label}
        </BreadcrumbPage>
      )}
    </BaseBreadcrumbItem>
  );
}

function BreadcrumbResponsive() {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useResponsive();
  const { breadcrumbs: items } = useBreadcrumb();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  console.log(pathname, items);
  if (pathname === "/" || !items.length) {
    return null;
  }

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

  const visibleItems = items.slice(-ITEMS_TO_DISPLAY + 1);
  const hasHiddenItems = items.length > ITEMS_TO_DISPLAY;

  return (
    <Breadcrumb className="mb-4">
      <JsonLd data={breadcrumbListData} />
      <BreadcrumbList>
        <BaseBreadcrumbItem>
          <BreadcrumbLink href={"/"}>Anasayfa</BreadcrumbLink>
        </BaseBreadcrumbItem>
        <BreadcrumbSeparator />

        {hasHiddenItems && (
          <>
            <BaseBreadcrumbItem>
              {!isDesktop ? (
                <BreadcrumbDropdown
                  items={items}
                  open={open}
                  setOpen={setOpen}
                />
              ) : (
                <BreadcrumbDrawer items={items} open={open} setOpen={setOpen} />
              )}
            </BaseBreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {visibleItems.map((item, index) => (
          <CustomBreadcrumbItem
            key={item.href || index}
            item={item}
            isLast={index === visibleItems.length - 1}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default dynamic(() => Promise.resolve(BreadcrumbResponsive), {
  ssr: false,
  loading: () => (
    <Skeleton className="mb-4 h-5 w-full animate-pulse rounded-md bg-primary/20" />
  ),
});
